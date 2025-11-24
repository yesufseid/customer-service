const { GoogleGenAI } =require("@google/genai")

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({apiKey})



const prompt = async (message) => {
  try {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:message,
  });
  console.log(response.text)
return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Error generating response.";
  }
};

module.exports = prompt;
