defmodule Squad.ApiView do
  use Squad.Web, :api_view

  def render("list_events.json", %{events: events}) do
    %{
      "events" => Enum.map(events, fn(e) -> render("show_event.json", %{event: e}) end)
    }
  end

  def render("show_event.json", %{event: event}) do
    %{
      "title" => event.title,
      "color" => event.color,
      "location" => event.location,
    }
  end

  def render("400.json", _params) do
    %{
      "error" => "Bad request"
    }
  end
end
