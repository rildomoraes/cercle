defmodule CercleApi.APIV2.WebhookController do
  use CercleApi.Web, :controller

  alias CercleApi.TimelineEvent
  alias CercleApi.User
  alias CercleApi.Contact

  require Logger

  def create(conn, params) do
    Logger.debug "> JOIN JOIN #{params["ToFull"][0]["Email"]}"
    text conn, "Showing id #{params["To"]}"
  end

 end
