import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

export const  GenratedQuestions = async (type="technical",
   role = "Software Engineer", 
   level = "Junior", 
   techstack = "React, Node.js, Express, MongoDB",
   amount = "1") =>{
    let result = [];
  
  try {

    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Prepare questions for a job interview.
        So, These are the following Perameters You have to generate the questions:
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or "." or any other special characters which might break the voice assistant.
        Return the questions formatted array like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
  });

//changed to comment  console.log(response.text);
  result = response.text;
}
catch (error) {
    console.error("Error generating questions:", error);
  }
   return result;
};
