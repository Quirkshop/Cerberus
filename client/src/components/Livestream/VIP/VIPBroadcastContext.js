import React, { createContext, useState, useEffect } from "react";
import { Socket, Presence } from "phoenix";
const List = require("collections/list");
export const VIPBroadcastContext = createContext();

export const VIPBroadcastProvider = (props) => {
	// Real Time Data
	const [messages, setMessages] = useState([]);
	const [presences, setPresences] = useState([]);
	const [streams, setStreams] = useState([]);
	// Global Variables & Data
	// const [sessionId, setSessionId] = useState(-1);
	// const [handleId, setHandleId] = useState(-1);
	// const [publisherId, setPublisherId] = useState(-1);
	// const [roomId, setRoomId] = useState(-1);
	// const [feedId, setFeedId] = useState(-1);
	// const [answer, setAnswer] = useState(-1);
	// const [isPublisher, setIsPublisher] = useState(false);

	return (
		<VIPBroadcastContext.Provider
			value={{
				msgs: messages,
				setMsgs: setMessages,
				activity: presences,
				setActivity: setPresences,
				streams: streams,
				setStreams: setStreams,
				// session: sessionId,
				// setSession: setSessionId,
				// handle: handleId,
				// setHandle: setHandleId,
				// publisher: publisherId,
				// setPublisher: setPublisherId,
				// room: roomId,
				// setRoom: setRoomId,
				// feed: feedId,
				// setFeed: setFeedId,
				// ans: answer,
				// setAns: setAnswer,
				// isPub: isPublisher,
				// setPub: setIsPublisher,
			}}
		>
			{props.children}
		</VIPBroadcastContext.Provider>
	);
};
