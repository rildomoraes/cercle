defmodule CercleApi.User do
  use CercleApi.Web, :model
  use Arc.Ecto.Model
  alias Passport.Password

  schema "users" do
    field :user_name, :string #is full rname
    field :password, :string, virtual: true
    field :password_hash, :string
    field :password_reset_code, :string
		belongs_to :company, CercleApi.Company
		field :login, :string
    field :profile_image, CercleApi.UserProfileImage.Type
    field :name, :string #is username
    field :time_zone, :string, default: "America/New_York"
    timestamps

    has_many :activities, CercleApi.Activity, on_delete: :delete_all
    has_many :timeline_event, CercleApi.TimelineEvent
    has_many :opportunities, CercleApi.Opportunity
  end

  @required_fields ~w()
  @optional_fields ~w(user_name password_reset_code company_id login name time_zone)
  @required_file_fields ~w()
  @optional_file_fields ~w(profile_image)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> cast_attachments(params, @required_file_fields, @optional_file_fields)
		|> unique_constraint(:login)
  end

  def registration_changeset(model, params) do model
    |> changeset(params)
    |> cast(params, ~w(password), [])
    |> validate_length(:password, min: 6, max: 100)
    |> put_hashed_password()
  end

  def update_changeset(model, params) do
    if params["password"] !="" do
      model
      |> changeset(params)
      |> cast(params, ~w(password), [])
      |> validate_length(:password, min: 6, max: 100)
      |> put_hashed_password()
    else
      model
      |> changeset(params)
    end
  end

  defp put_hashed_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Password.hash(pass))
        _ ->
          changeset
    end
  end
end
