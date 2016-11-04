defmodule Squad.PageController do
  use Squad.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
