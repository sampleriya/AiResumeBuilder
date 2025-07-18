import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
async function generateResponse(resumeText) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
  });
  const response = await openai.chat.completions.create(
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a resume expert. Your task is to review the resume text provided and fill up the following variables on the basis of that resume text and remember to always return an object like one given below as an example. Always return the object as a valid JSON string without any extra characters or formatting.
           {
            name: "JIMOTHY BAGATSING, CPA",
            contactInfo: {
            phone: "0123 456 7890",
            email: "hello@reallygreatsite.com",
            address: "123 Diwa St., Kalayaan City 1234",
            },
            linkedinUrl: "https://linkedin.com/in/name",
            workExperience: [
            {
                title: "TAX MANAGER",
                company: "Washimi Laundry",
                startDate: "June 2020",
                endDate: "Present",
                details: [
                "Assisted in the preparation of annual budgets and financial forecasts",
                "Conducted regular audits of financial records and processes to ensure compliance with accounting standards and regulations",
                ],
            },
            {
                title: "STAFF ACCOUNTANT",
                company: "Bangon Savings Bank",
                startDate: "January 2018",
                endDate: "May 2020",
                details: [
                "Collaborated with other departments to resolve accounting-related issues and provide financial guidance",
                "Maintained accurate and up-to-date records of financial transactions and documentation",
                "Utilized accounting software and tools to streamline processes and improve efficiency.",
                ],
            },
            ],
            skills: [
            "Accounting principles",
            "Tax laws",
            "Financial data analytics",
            "Expert in accounting software and tools",
            "Communication of financial information to stakeholders",
            ],
            education: [
            {
                degree: "BACHELOR IN ACCOUNTING",
                institution: "Las Felipinas University",
                startYear: "2014",
                endYear: "2018",
            },
            {
                degree: "MASTER IN BUSINESS ADMINISTRATION",
                institution: "Kalayaan Business School",
                startYear: "2021",
                endYear: "2023",
            },
            ],
            certification: [
            {
                title: "CERTIFIED PUBLIC ACCOUNTANT (CPA)",
                year: "2021",
                authority: "Professional Regulations Commission",
            },
            {
                title: "CERTIFIED FINANCIAL ANALYST (CFA)",
                year: "2022",
                authority: "CFA Institute",
            },
            ],
            awards: [
            {
                title: "Outstanding Accountant of the Year",
                year: "2022",
                awarder: "Accounting Association of the Philippines",
            },
            {
                title: "Best in Taxation",
                year: "2021",
                awarder: "Philippine Institute of Certified Public Accountants",
            },
            ],
        }
          `,
        },
        {
          role: "user",
          content: `Please analyze the following resume and please just give an object of variables in the form of response for this and return empty array for variables whose content is not provided,
        Resume Text:
        ${resumeText}`,
        },
      ],
    },
  );
  let text = response.choices[0].message.content;
  return text;
}
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { resumeText } = req.body;
  console.log("resumeText", resumeText)
  if (!resumeText) {
    return res.status(400).json({ message: "text is required" });
  }
  try {
    const response = await generateResponse(resumeText);
    console.log("response", response)
    let resume;
    try {
      resume = JSON.parse(response);
      console.log("Parse response (resume)", resume)
    } catch (error) {
      console.error("Failed to parse JSON:", response);
      throw new Error("Failed to parse JSON: " + error.message);
    }
    res.json(resume);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}