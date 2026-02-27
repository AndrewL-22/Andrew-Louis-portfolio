import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi")) return "Hi there! How can I assist you?";
    if (lower.includes("resume")) return "You can download my resume from the 'Download CV' button above.";
    if (lower.includes("projects")) return "Check out the Projects section to see what I've built!";
    return "Sorry, I can only answer basic questions for now. Try asking about resume or projects.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getAIResponse(input) }]);
    }, 500);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window — fixed size, never grows */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-5 z-50 w-80 max-w-sm bg-card rounded-xl shadow-xl flex flex-col"
          style={{ height: "420px" }}
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-3 rounded-t-xl flex justify-between items-center shrink-0">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages — scrollable, fills remaining space */}
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input — pinned to bottom */}
          <div className="p-3 flex gap-2 border-t border-border shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring focus:ring-primary/50 text-sm"
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform duration-200 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};