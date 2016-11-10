defmodule Squad.Repo do
  #use Ecto.Repo, otp_app: :squad
  def all(Squad.Event) do
    [
      %Squad.Event{:id => "1", :title => "Some example Event", :datetime => "2016-10-26T16:35:09-05:00", :location => "ECB", :color => "f284a8"},
      %Squad.Event{:id => "2", :title => "Some other Event", :datetime => "2016-11-10T16:35:09-05:00", :location => "Witte Hall", :color => "a8f284"},
    ]
  end

  def all(_module), do: []

  def get(module, id) do
    Enum.find all(module), fn (element) -> element.id == id end
  end

  def get!(module, id) do
    get(module, id)
    |> raise_error_if_nil("#{module} of id #{id} was not found")
  end

  defp raise_error_if_nil(value, message) do
    if is_nil(value) do
      raise message
    else
      value
    end
  end

  def get_by(module, params) do
    Enum.find all(module), fn map ->
      Enum.all?(params, fn {key, val} -> Map.get(map, key) == val end)
    end
  end
end
