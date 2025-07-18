import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
async function generateResponse(resumeText, mistakes) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });
  if (mistakes.length > 0) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a resume expert tasked with analyzing resumes and tracking mistakes. You will receive a list of mistakes that were previously identified. Your job is to:
              1. Check if these mistakes have been corrected in the provided resume text.
              2. Identify any new mistakes.
              3. Avoid mentioning corrected mistakes and provide a score for each section of the resume (Education, Contact, Skills, Experience, Interests) out of 100.
              4. Provide new mistakes if any arise and a score for each section based on the presence of mistakes.
              5. Return an object with exactly these keys: Education, Contact, Skills, Experience, Interests. Exactly like this
                 {
                "Education": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
                "Contact": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
                "Skills": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
                "Experience": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
                "Interests": { "score": , "smallMistakes": [ "", "", ... ], "mediumMistakes": [ "", "", ... ], "bigMistakes": [ "", "", ... ] },
              }
              Do not return any empty strings or empty arrays. Be strict and detailed in your analysis. The resume sections are: Education, Contact, Skills, Experience, Interests.
              `,
        },
        {
          role: "user",
          content: `Please analyze the following resume text:
            Resume Text:
            ${resumeText}
            Analyze it based on the mistakes provided and give new feedback on corrections and new mistakes:
            Mistakes:
            ${mistakes}
            `,
        },
      ],
    });
    const text = response.choices[0].message.content;
    return text;
  } else {
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
}
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { resumeText, mistakes } = req.body;
  if (!resumeText) {
    return res
      .status(400)
      .json({ message: "Resume text and mistakes are required" });
  }
  try {
    const response = await generateResponse(resumeText, mistakes);
    const analysis = JSON.parse(response);
    res.send({ analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}