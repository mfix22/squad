defmodule Squad.Repo.Migrations.Owners do
  use Ecto.Migration

  def change do
    create table(:owners) do
      add :key, :string
      add :event, :integer
    end
  end
end
