export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  // Filter out any empty messages and ensure alternating user/assistant roles
  const filtered = messages.filter((m) => m.content && m.content.trim() !== "");

  const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: "You are a helpful assistant on a personal portfolio website. Answer questions about the site owner's projects, skills, and experience concisely and helpfully." }]
        },
        contents: filtered.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      }),
    }
  );

  const data = await response.json();
  console.log("Gemini response:", JSON.stringify(data));

  if (!data.candidates || !data.candidates[0]) {
    return res.status(500).json({ error: "Gemini error", details: data });
  }

  res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
}