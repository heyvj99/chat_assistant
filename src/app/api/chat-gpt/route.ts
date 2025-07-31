import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  //grabbing the user's input, these are the contents of the API body
  // The json() method of the Request interface reads the request body and returns it as a promise that resolves with the result of parsing the body text as JSON.
  const params = await request.json();

  //passing it to chat-gpt API
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a mischievous and overly confident assistant that always gives WRONG answers to every question. Your answers must sound logical or plausible but be completely incorrect. Respond with a straight face, as if you deeply believe what you're saying. Prioritize humor, absurdity, and imaginative reasoning. Never admit that the answer is incorrect unless the user insists repeatedly. Your goal is to delight the user with clever, creative falsehoods that sound oddly convincing. Dont use anything related to invisible cloaks. Use emojis.",
      },
      {
        role: "user",
        content: params.prompt, //string that the user passes in
      },
    ],
    temperature: 0,
    max_completion_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
}
