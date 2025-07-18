import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
async function generateResponse(resumeText) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a resume expert with the ability to analyze and evaluate resumes. Your task is to review the resume text provided and not the alignment as it is just text, it's compulsory to identify atleast one mistake for each section of the resume specially for Interests, Education, Contact, Skills, Experience and provide a score out of 100 for each section of the resume and Don't return any empty string in array. Be strict about scoring, give bad scores if you find any mistakes. The sections of the resume are: Education, Contact, Skills, Experience, Interests. Remember to always return an Object like this with exactly same keys I have used
          {
            "Education": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
            "Contact": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
            "Skills": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
            "Experience": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
            "Interests": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
          }
          `,
      },
      {
        role: "user",
        content: `Please analyze the following resume text and Give atleast one mistake for each and every section, specifically for Interests as most Resumes lack this section.
        Resume Text:
        ${resumeText}`,
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
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ message: "text is required" });
  }
  try {
    const response = await generateResponse(resumeText);
    const analysis = JSON.parse(response);
    res.send({ analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}