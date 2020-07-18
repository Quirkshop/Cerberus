defmodule BroadcastWeb.BroadcastChannel do
  use Phoenix.Channel
  require Logger

  intercept ["janus_handler"]

  def join("broadcast:lobby", message, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.join(broadcast:lobby, message, socket)"
    IO.inspect(message, label: "message")
    IO.inspect(socket, label: "socket")

    {:ok, %{channel: "lobby"}, socket}
  end
  
  def join("broadcast:" <> room_id, payload, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.join(broadcast: <> room_id, message, socket)"
    IO.inspect(payload, label: "payload")
    IO.inspect(socket, label: "socket")
    
    {:ok, %{channel: "#{room_id}"}, socket}
  end

  def handle_in("new_msg", msg, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.handle_in(new_msg, msg, socket)"
    IO.inspect(msg, label: "msg")
    IO.inspect(socket, label: "socket")
    {:ok, socket} = process(msg, socket)
    {:reply,{:ok, msg}, socket}
  end

  def handle_out("janus_handler", msg, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.handle_out(janus_handler, msg, socket)"
    IO.inspect(msg, label: "msg")
    IO.inspect(socket, label: "socket")
    push(socket, "new_msg", msg.ref)
    {:noreply, socket}
  end

  # internal
  def process(%{"request" => "create_session"}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(create_session)"
    IO.inspect(socket, label: "socket")
    {:ok, janus_ws} = Broadcast.JanusSupervisor.create_janus_connection(socket)
    IO.inspect(janus_ws, label: "janus_ws")
    WebSockex.send_frame(janus_ws, {:text, Jason.encode!(%{"janus" => "create", "transaction" => "create_session"})})
    {:ok, assign(socket, :janus_ws, janus_ws)}
  end

  def process(%{"request" => "create_handle", "session_id" => session_id}, socket) do
    # require IEx; IEx.pry
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(create_handle)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "attach", "plugin" => "janus.plugin.videoroom" ,"transaction" => "create_handle", "session_id" => session_id})})
    {:ok, socket}
  end

  def process(%{"request" => "keepalive", "session_id" => session_id}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(keepalive)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "keepalive", "transaction" => "keepalive", "session_id" => session_id})})
    {:ok, socket}
  end

  def process(%{"request" => "create_room", "session_id" => session_id, "handle_id" => handle_id}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(create_room)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    IO.inspect(handle_id, label: "handle_id")
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "message" ,"transaction" => "create_room", "body" => %{"request" => "create"}, "session_id" => session_id, "handle_id" => handle_id})})
    {:ok, socket}
  end
  
  def process(%{"request" => "join_publisher", "session_id" => session_id, "handle_id" => handle_id, "room_id" => room_id}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(join_publisher)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    IO.inspect(handle_id, label: "handle_id")
    IO.inspect(room_id, label: "room_id")
    body = %{"request" => "join", "ptype" => "publisher", "room" => room_id}
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "message" ,"transaction" => "join_publisher", "body" => body, "session_id" => session_id, "handle_id" => handle_id})})
    {:ok, socket}
  end

  def process(%{"request" => "join_subscriber", "session_id" => session_id, "handle_id" => handle_id, "room_id" => room_id, "feed_id" => feed_id}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(join_subscriber)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    IO.inspect(handle_id, label: "handle_id")
    IO.inspect(room_id, label: "room_id")
    IO.inspect(feed_id, label: "feed_id")
    body = %{"request" => "join", "ptype" => "subscriber", "room" => room_id, "feed" => feed_id}
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "message" ,"transaction" => "join_subscriber", "body" => body, "session_id" => session_id, "handle_id" => handle_id})})
    {:ok, socket}
  end

  def process(%{"request" => "publish", "session_id" => session_id, "handle_id" => handle_id, "jsep" => offer}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(publish)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    IO.inspect(handle_id, label: "handle_id")
    IO.inspect(offer, label: "offer")
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "message" ,"transaction" => "publish", "body" => %{"request" => "publish"}, "jsep" => offer , "session_id" => session_id, "handle_id" => handle_id})})
    {:ok, socket}
  end

  def process(%{"request" => "listen", "session_id" => session_id, "handle_id" => handle_id, "jsep" => answer}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(listen)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    IO.inspect(handle_id, label: "handle_id")
    IO.inspect(answer, label: "answer")
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "message" ,"transaction" => "listen", "body" => %{"request" => "start"}, "jsep" => answer , "session_id" => session_id, "handle_id" => handle_id})})
    {:ok, socket}
  end

  def process(%{"request" => "trickle", "session_id" => session_id, "handle_id" => handle_id, "candidate" => candidate}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(trickle)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    IO.inspect(handle_id, label: "handle_id")
    IO.inspect(candidate, label: "candidate")
    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "trickle" ,"transaction" => "trickle", "candidate" => candidate , "session_id" => session_id, "handle_id" => handle_id})})
    {:ok, socket}
  end

  def process(%{"request" => "detach", "session_id" => session_id, "handle_id" => handle_id, "room_id" => room_id, "feed_id" => feed_id}, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.process(detach)"
    IO.inspect(socket, label: "socket")
    IO.inspect(session_id, label: "session_id")
    IO.inspect(handle_id, label: "handle_id")
    IO.inspect(feed_id, label: "feed_id")
    IO.inspect(room_id, label: "room_id")

    WebSockex.send_frame(socket.assigns.janus_ws, {:text, Jason.encode!(%{"janus" => "destroy", "transaction" => "destroy", "session_id" => session_id, "handle_id" => handle_id, "room_id" => room_id, "feed_id" => feed_id})})
  end

  # Handle termination / people leaving the chatroom
  # Broadcast a message with reason why/how they left
  # Untrack their prescence 
  # Need to update the prescence list 
  def terminate(reason, socket) do
    Logger.info "Called BroadcastWeb.BroadcastChannel.terminate(reason, socket)"
    IO.inspect(reason, label: "reason")
    IO.inspect(socket, label: "socket")
    # case reason do
    #   {:shutdown, :left} -> 
    #     message = "#{socket.assigns.user} has left"
    #     broadcast! socket, "message:new", %{ user: socket.assigns.user, body: message, timestamp: :os.system_time(:milli_seconds)}
    #   {:shutdown, :closed} ->
    #     message = "#{socket.assigns.user} connection has closed"
    #     broadcast! socket, "message:new", %{ user: socket.assigns.user, body: message, timestamp: :os.system_time(:milli_seconds)}
    #   _ -> 
    #     message = "#{socket.assigns.user} has left for unknown reason"
    #     broadcast! socket, "message:new", %{ user: socket.assigns.user, body: message, timestamp: :os.system_time(:milli_seconds)}
    # end
    {:ok, socket}
  end

end 
