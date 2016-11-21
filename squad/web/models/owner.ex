defmodule Squad.Token do
  use Squad.Web, :model

  # events is the DB table
  schema "tokens" do
    field :key, :string
    belongs_to :event, Squad.Event
  end

  def gen_key (event_id) do
    :crypto.hash(:md5, Integer.to_string(event_id))
    |> Base.encode16()
    |> String.slice 1..15
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:key, :event])
    |> validate_required([:key, :event])
  end
end
