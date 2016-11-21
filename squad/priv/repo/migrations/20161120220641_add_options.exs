defmodule Squad.Repo.Migrations.AddOptions do
  use Ecto.Migration

  def change do
    create table(:options) do
      add :time, :string
      add :count, :integer
    end
  end
end
