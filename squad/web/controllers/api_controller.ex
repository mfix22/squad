# Called by Squad.Router
defmodule Squad.ApiController do
  use Squad.Web, :controller

  def list(conn, _opts) do
    render conn, "list.json", data: Repo.all(Event)
  end

  def show(conn, params) do
    render conn, "show.json", data: Repo.all(Event)
  end

  def healthcheck(conn, _opts) do
    json conn, "ok"
  end
end

defmodule Squad.ApiView do
  use Squad.Web, :view
  @attributes ~W(id title datetime location color)

  def render("show.json", %{data: data}) do
    data
    |> Map.take(@attributes)
  end
end
