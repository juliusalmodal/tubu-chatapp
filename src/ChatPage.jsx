import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ChatBubble from "./ChatBubble";

//const API_URL = "http://localhost:7071/api/messages";
const API_URL = "https://tubu-chat-app-hya8b9hnguh9gucs.southeastasia-01.azurewebsites.net/api/messages";

export default function ChatPage() {
  const { userId } = useParams();
  const me = userId.toLowerCase() === "jules" ? "Jules" : "Mikee";
  const other = me === "Jules" ? "Mikee" : "Jules";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages every 2 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMessages(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const body = {
      from: me,
      text: input.trim()
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    setInput("");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        background: "#0f172a",
        color: "white",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        {me} 💬 {other}
      </h2>

      {/* Message list */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          background: "#1e293b",
          padding: "12px 10px",
          borderRadius: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
          scrollBehavior: "smooth"
        }}
      >

        {loading && <p>Loading messages...</p>}

        {!loading &&
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              isMine={msg.from === me}
              message={msg}
            />
          ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={sendMessage}
        style={{
            display: "flex",
            gap: "8px",
            padding: "8px 0",
            boxSizing: "border-box"
        }}
     >   
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${other}…`}
            style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #475569",
                background: "#0f172a",
                color: "white",
                fontSize: "1rem",
                boxSizing: "border-box"
            }}
        />


        <button
        type="submit"
        style={{
            padding: "12px 18px",
            borderRadius: "10px",
            background: "#4ade80",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            minWidth: "70px"
        }}
        >
        Send
        </button>
      </form>
    </div>
  );
}