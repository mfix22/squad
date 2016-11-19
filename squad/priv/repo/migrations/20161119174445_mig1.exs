defmodule Squad.Repo.Migrations.Mig1 do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :title, :string
      add :color, :string
      add :location, :string
    end
  end
end
