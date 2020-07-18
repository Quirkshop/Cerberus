defmodule BroadcastWeb.BroadcastChatChannel do
  use Phoenix.Channel
  alias BroadcastWeb.Presence
  require Logger
  require Phoenix.Naming

  def join("broadcast_chat:lobby", payload, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChatChannel.join(broadcast:lobby, message, socket)"
    IO.inspect(payload, label: "payload")
    IO.inspect(socket, label: "socket")
    
    send self(), :after_join
    {:ok, %{channel: "lobby"}, socket}
  end

  def join("broadcast_chat:" <> room_id, payload, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChatChannel.join(broadcast_chat: <> room_id, message, socket)"
    IO.inspect(payload, label: "payload")
    IO.inspect(socket, label: "socket")
    
    send self(), :after_join
    {:ok, %{channel: "#{room_id}"}, socket}
  end

  # Setup up prescence tracking
  def handle_info(:after_join, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChatChannel.handle_info(after_join, socket)"
    IO.inspect(socket, label: "socket")

    {:ok, _} = Presence.track(socket, socket.assigns.user["id"], %{
      online_at: :os.system_time(:milli_seconds),
      name: socket.assigns.user["name"],
      pic: socket.assigns.user["pic"]

    })
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  def handle_in("message:new", message, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChatChannel.handle_in(message:new, message, socket)"
    IO.inspect(message, label: "message")
    IO.inspect(socket, label: "socket")
    broadcast! socket, "message:new", %{
      user: socket.assigns.user,
      body: message,
      timestamp: :os.system_time(:milli_seconds)
    }
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (broadcast_chat_channel:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end

  # Handle termination / people leaving the chatroom
  # Broadcast a message with reason why/how they left
  # Untrack their prescence 
  # Need to update the prescence list 
  def terminate(reason, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChatChannel.terminate(reason, socket)"
    IO.inspect(reason, label: "reason")
    IO.inspect(socket, label: "socket")
    case reason do
      {:shutdown, :left} -> 
        message = "#{socket.assigns.user["name"]} has left"
        broadcast! socket, "message:new", %{ user: socket.assigns.user["name"], body: message, timestamp: :os.system_time(:milli_seconds)}
      {:shutdown, :closed} ->
        message = "#{socket.assigns.user["name"]} connection has closed"
        broadcast! socket, "message:new", %{ user: socket.assigns.user["name"], body: message, timestamp: :os.system_time(:milli_seconds)}
      _ -> 
        message = "#{socket.assigns.user["name"]} has left for unknown reason"
        broadcast! socket, "message:new", %{ user: socket.assigns.user["name"], body: message, timestamp: :os.system_time(:milli_seconds)}
    end
    :ok = Presence.untrack(socket, socket.assigns.user)
    {:ok, socket}
  end
end
