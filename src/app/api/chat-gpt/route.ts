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
        content: `Your are in a ${params.tone}. Keep the answer to 3-4 sentence max and each sentence to at max 4-6 words.`,
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
