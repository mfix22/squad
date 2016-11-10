# Called by Squad.Router
defmodule Squad.ApiController do
  use Squad.Web, :controller
  alias Squad.Event

  def create(conn, params) do
    render conn, "show.json", event: %Event{title: params["title"]}
  end

  def list(conn, _params) do
    render conn, "index.json", data: Repo.all(Squad.Event)
  end

  def show(conn, params) do
    render conn, "show.json", event: Repo.get!(Squad.Event, params["id"])
  end

  def healthcheck(conn, _opts) do
    json conn, "ok"
  end
end

defmodule Squad.ApiView do
  use Squad.Web, :view
  @attributes ~W(id title datetime location color)

  # Render the index.json view
  def render("index.json", %{data: events}) do
    events
    |> Enum.map( fn(e) -> render("show.json", %{event: e}) end)
  end

  # Render the show.json view
  def render("show.json", %{event: event}) do
    render("success.json", data: event)
  end

  # JSON API response format
  def render("success.json", %{data: data}) do
    %{
      :jsonapi => Squad.JSONAPI.impl,
      :data => data,
    }
  end
end

defmodule Squad.JSONAPI do
  def impl do
    %{
      :version => "???"
    }
  end
end
