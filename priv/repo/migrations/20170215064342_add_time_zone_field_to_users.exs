defmodule CercleApi.Repo.Migrations.AddTimeZoneFieldToUsers do
  use Ecto.Migration

  def change do
  	alter table(:users) do
      add :time_zone, :string, default: "America/New_York"
    end
  end
end
