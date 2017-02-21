defmodule CercleApi.Activity do
  use CercleApi.Web, :model

  schema "activities" do
    belongs_to :user, CercleApi.User
    belongs_to :contact, CercleApi.Contact
    belongs_to :company, CercleApi.Company
    field :due_date, Ecto.DateTime
    field :is_done, :boolean, default: false
    field :title, :string

    timestamps
  end

  @required_fields ~w(user_id contact_id company_id)
  @optional_fields ~w(due_date is_done title)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
	
end
