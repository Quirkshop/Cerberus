defmodule BroadcastWeb.UserSocket do
  use Phoenix.Socket
  require Logger

  ## Channels
  # channel "room:*", BroadcastWeb.RoomChannel
  channel "broadcast:*", BroadcastWeb.BroadcastChannel
  channel "broadcast_chat:*", BroadcastWeb.BroadcastChatChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"user" => user}, socket, connect_info) do
    Logger.info "CalledBroadcastWeb.UserSocket.connect(user,  socket)"
    IO.inspect(user, label: "user")
    IO.inspect(socket, label: "socket")
    {:ok, assign(socket, :user, user)}
  end

  def connect(params, socket, connect_info) do
    Logger.info "CalledBroadcastWeb.UserSocket.connect(params, socket, connect_info)"
    IO.inspect(params, label: "params")
    IO.inspect(socket, label: "socket")
    IO.inspect(connect_info, label: "connect_info")
    {:ok, socket}
  end

  

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     BroadcastWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
