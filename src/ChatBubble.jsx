export default function ChatBubble({ isMine, message }) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div
    style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        marginBottom: "8px",
        padding: "0 4px",
        boxSizing: "border-box",
    }}
    >
      <div
        style={{
        maxWidth: "85%",
        padding: "10px 14px",
        borderRadius: "16px",
        background: isMine ? "#4ade80" : "#3b82f6",
        color: isMine ? "#022c22" : "white",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
        borderBottomRightRadius: isMine ? "4px" : "16px",
        borderBottomLeftRadius: isMine ? "16px" : "4px",
        }}
      >
        <div style={{ fontSize: "0.9rem", marginBottom: "3px" }}>
          {message.text}
        </div>
        <div style={{ fontSize: "0.7rem", opacity: 0.7, textAlign: "right" }}>
          {time}
        </div>
      </div>
    </div>
  );
}