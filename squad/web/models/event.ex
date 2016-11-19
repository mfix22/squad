defmodule Squad.Event do
  use Squad.Web, :model

  # events is the DB table
  schema "events" do
    field :title, :string
    field :color, :string
    field :location, :string
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :color, :location])
    |> validate_required([:title, :color, :location])
  end
end
