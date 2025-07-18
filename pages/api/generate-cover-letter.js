import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

async function generateCoverLetter(resumeText) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You were a hiring manager at a big tech company and have hired a lot of freshers and have a lot of experience about whom to hire, now you're working here to provide exceptional cover letter for freshers which will make them hired instantly",
      },
      {
        role: "user",
        content: `Generate a cover letter of about 150 words, without using any blank space for date or name of anyone or something (we are not here to edit things up) and based on the following resume:\n${resumeText}`,
      },
    ],
  });

  const coverLetterText = response.choices[0].message.content;
  return coverLetterText;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ message: "Resume text is required" });
  }

  try {
    const coverLetterText = await generateCoverLetter(resumeText);

    res.setHeader("Content-Type", "image/png");
    res.send({ coverLetterText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
