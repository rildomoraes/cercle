defmodule CercleApi.APIV2.ActivityController do

  require Logger
  use CercleApi.Web, :controller
  use Timex
  alias CercleApi.Activity
  alias CercleApi.Contact
  alias CercleApi.Company
  alias CercleApi.Organization
  alias CercleApi.User

  plug :scrub_params, "activity" when action in [:create, :update]


  def create(conn, %{"activity" => activity_params }) do
   
   changeset = Activity.changeset(%Activity{}, activity_params)
    case Repo.insert(changeset) do
      {:ok, activity} ->
        activity_reload = Repo.get!(CercleApi.Activity, activity.id) |> Repo.preload([:user])
        company = Repo.get!(CercleApi.Company, activity_reload.user.company_id) |> Repo.preload([:users])
        html = Phoenix.View.render_to_string(CercleApi.ContactsView, "_task.html", id: activity.id, is_done: activity.is_done, title: activity.title, due_date: activity.due_date, user_name: activity_reload.user.user_name, user_id: activity_reload.user_id, company: company, current_user_time_zone: activity_params["current_user_time_zone"])
        channel = "contacts:"  <> to_string(activity.contact_id)
        CercleApi.Endpoint.broadcast!( channel, "new:activity", %{"html" => html})
        json conn, "{OK: true}"
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(CercleApi.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "activity" => activity_params}) do
  
    activity = Repo.get!(Activity, id)
    changeset = Activity.changeset(activity, activity_params)
    case Repo.update(changeset) do
      {:ok, activity} ->
        render(conn, "show.json", activity: activity)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(CercleApi.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    activity = Repo.get!(Activity, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(activity)

    send_resp(conn, :no_content, "")
  end

end
