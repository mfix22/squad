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
    alias Squad.Owner
    alias Plug.Conn

    event = Event.changeset(%Event{}, params)

    case Squad.Repo.insert(event) do
      { :ok, inserted_event } ->
        owner_key = Owner.gen_key(inserted_event.id)
        IO.puts owner_key
        owner = Owner.changeset(%Owner{}, %{
          key: owner_key,
          event: inserted_event.id
        })
        case Squad.Repo.insert(owner) do
          { :ok, inserted_owner } ->
            render conn, "show_event.json", %{ event: inserted_event }
          { :error, owner_changeset } ->
            render conn, "show_error.json",
              %{ error: %{ message: "Failed to set owner" }}
        end
      { :error, changeset} ->
        render conn, "show_error.json",
          %{ error: %{ message: "Invalid event data."} }
    end
  end

end
