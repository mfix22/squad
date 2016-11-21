defmodule Squad.Event do
  use Squad.Web, :model

  # events is the DB table
  schema "events" do
    field :title, :string
    field :color, :string, default: "#121212"
    field :location, :string
  end

  def changeset(event, changes \\ %{}) do
    cast(event, changes, [:title, :color, :location])
    |> validate_required([:title, :location])
  end
end
