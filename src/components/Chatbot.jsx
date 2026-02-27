import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Loader2 } from "lucide-react";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm your AI assistant. Ask me anything about this portfolio!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setIsLoading(true);

    const apiMessages = messages
      .concat({ from: "user", text: userText })
      .filter((m) => m.from === "user" || m.from === "bot")
      .filter((m) => m.text && m.text.trim() !== "")
      .map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }))
      .filter((_, i, arr) => !(i === 0 && arr[0].role === "assistant"));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-20 right-5 z-50 w-80 max-w-sm bg-card rounded-xl shadow-xl flex flex-col"
          style={{ height: "420px" }}
        >
          <div className="bg-primary text-primary-foreground p-3 rounded-t-xl flex justify-between items-center shrink-0">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 overflow-y-auto flex-1 bg-background space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`${msg.from === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg text-sm max-w-[85%] break-words ${
                    msg.from === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground border border-border"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-left">
                <div className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground border border-border text-sm">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 flex gap-2 border-t border-border shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring focus:ring-primary/50 text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};