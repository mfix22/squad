defmodule Squad.Event.Option do
  use Squad.Web, :model

  schema "options" do
    field :time, :string
    field :count, :integer
  end

  def changeset(option, params \\ %{}) do
    option
    |> validate_required([:time])
  end
end
