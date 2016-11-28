defmodule Squad.Event do
  use Squad.Web, :model

  # events is the DB table
  schema "events" do
    field :title, :string
    field :color, :string, default: "#121212"
    field :location, :string
    has_many :tokens, Squad.Token
  end

  @required_fields [:title, :location] #~w(title location)
  @optional_fields [:color] #~w(color)

  def changeset(event, changes \\ %{}) do
    event
    |> cast(changes, [:title, :color, :location])
    |> validate_required(@required_fields)
    |> cast_assoc(:tokens, required: true)
  end
end
