defmodule Squad.ApiController do
  use Squad.Web, :controller

  # Events
  def list_events(conn, _params) do
    render conn, "list_events.json", %{events: Squad.Repo.all(Squad.Event)}
  end

  def show_event(conn, params) do
    render conn, "show_event.json", %{event: Squad.Repo.get!(Squad.Event, params["id"])}
  end

  # TODO: get this working
  def create_event(conn, params) do
    alias Squad.Event
    alias Squad.Token
    alias Plug.Conn

    event = Event.changeset(%Event{}, params)

    owner_key = Token.gen_key(32423)
    owner = Token.changeset(%Token{}, %{
      key: owner_key
    })

    result =
      event
      |> Event.put_assoc(:tokens, owner)
      |> Squad.Repo.insert!

    render conn, "show_event.json", %{ event: result }

  end
end
