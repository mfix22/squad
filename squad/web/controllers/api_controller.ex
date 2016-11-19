defmodule Squad.ApiController do
  use Squad.Web, :controller

  def list_events(conn, _params) do
    render conn, "list_events.json", %{events: Squad.Repo.all(Squad.Event)}
  end

  def show_event(conn, params) do
    render conn, "show_event.json", %{event: Squad.Repo.get!(Squad.Event, params["id"])}
  end

  # TODO: get this working
  def create_event(conn, params) do
    event = Squad.Event.changeset(Squad.Event)
    render conn, "show_event.json", %{event: Squad.Repo.insert!(Squad.Event, event)}

  end
end
