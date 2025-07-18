import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
async function generateResponse(jobDescription) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that helps identify key skillsets required for a job based on the provided job description. Organize the skillsets into an object of arrays with 'Required Skillsets', 'Desired Skillsets', and 'Additional Skillsets'. Ensure there are exactly 5 skills in each category and it's really important to always return the response in Object format without any additional text.",
      },
      {
        role: "user",
        content: `Given the following job description, identify and list the skillsets in an object of arrays with 'Required Skillsets', 'Desired Skillsets', and 'Additional Skillsets'. Ensure there are exactly 5 skills in each category and return the response in plain JSON format:\n\n ${jobDescription}`,
      },
    ],
  });
  const text = response.choices[0].message.content;
  return text;
}
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { jobDescription } = req.body;
  if (!jobDescription) {
    return res.status(400).json({ message: "text is required" });
  }
  try {
    const response = await generateResponse(jobDescription);
    const skills = JSON.parse(response);
    res.send({ skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}