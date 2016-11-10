defmodule Squad.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use Squad.Web, :controller
      use Squad.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.Changeset
      import Ecto.Query
    end
  end

  def controller do
    quote do
      use Phoenix.Controller

      alias Squad.Repo
      #import Ecto
      #import Ecto.Query

      #import Squad.Router.Helpers
      #import Squad.Gettext
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      alias Squad.Repo
      import Ecto
      import Ecto.Query
      import Squad.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
