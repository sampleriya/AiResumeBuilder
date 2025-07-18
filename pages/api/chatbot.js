import OpenAI from "openai";
import dotenv from "dotenv";
import { getCookie, setCookie } from "cookies-next";
dotenv.config();
async function generateResponse(messages) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  const text = response.choices[0].message.content;
  return text;
}
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "text is required" });
  }
  try {
    let sessionMessages = getCookie("chatbot_session", { req, res });
    sessionMessages = sessionMessages
      ? JSON.parse(sessionMessages)
      : [
          {
            role: "system",
            content:
              "You are a helpful chatbot in AiResumeBuilder. You only provide information related to AiResumeBuilder, its services, and products. AiResumeBuilder is a platform designed to help freshers and experienced professionals create cutting-edge resumes using a modern UI and AI-powered features for analysis. If someone asks you for any programming code, reply by stating, 'I'm here to provide information about AiResumeBuilder and its features, but I do not provide any code.' You are equipped to assist users in creating and editing professional profile summaries that will make their resumes stand out.",
          },
        ];
    sessionMessages.push({
      role: "user",
      content: message,
    });
    const responseMessage = await generateResponse(sessionMessages);
    sessionMessages.push({
      role: "assistant",
      content: responseMessage,
    });
    setCookie("chatbot_session", JSON.stringify(sessionMessages), {
      req,
      res,
      maxAge: 60 * 60,
    });
    res.send({ response: responseMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}