defmodule Squad.Event do
  use Squad.Web, :model

  # events is the DB table
  schema "events" do
    field :title, :string
    field :color, :string, default: "#121212"
    field :location, :string
    has_many :tokens, Squad.Token
  end

  def changeset(event, changes \\ %{}) do
    cast(event, changes, [:title, :color, :location])
    |> validate_required([:title, :location])
  end
end
