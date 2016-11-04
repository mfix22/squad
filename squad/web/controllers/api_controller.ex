defmodule Squad.ApiController do
  use Squad.Web, :controller

  def index(conn, _params) do
    resp(conn, 200, "hello world")
  end
end
