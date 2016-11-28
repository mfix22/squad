defmodule Squad.Token do
  use Squad.Web, :model

  # events is the DB table
  schema "tokens" do
    field :key, :string
    belongs_to :event, Squad.Event
  end

  # TODO: this is not secure and must be changed
  def gen_key (event_id) do
    :crypto.hash(:md5, Integer.to_string(event_id))
    |> Base.encode16()
    |> String.slice(1..15)
  end

  @required_fields ~w(key)

  def changeset(struct, params \\ :empty) do
    struct
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
  end
end
