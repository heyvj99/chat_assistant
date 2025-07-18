"use client";
import PromptForm from "@/components/PromptForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Define the expected structure of a choice
interface Choice {
  index: number;
  message: {
    content: string;
  };
}

export default function Home() {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tone, setTone] = useState<string>("");

  return (
    <main>
      <p className="text-3xl font-bold ">Hello</p>
      <select
        id="mySelect"
        onChange={(e) => {
          setTone(e.target.value);
        }}
      >
        <option value="Funny">Funny</option>
        <option value="Sarcastic">Sarcastic</option>
        <option value="Angry">Angry</option>
      </select>

      <PromptForm
        isLoading={isLoading}
        // one thing to note here is that we are not calling the function here
        //we are just passing the function definition
        // this function will be called inside the onSubmit method of the form inside the component with actual prompt value

        onPromptSubmit={async (prompt: string) => {
          setIsLoading(true);
          const response = await fetch("./api/chat-gpt/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: prompt,
              tone: tone,
            }),
          });

          const result = await response.json();

          setChoices(choices.concat(result.choices));
          setIsLoading(false);

          console.log("RESPONSE", response);
        }}
      />

      {choices.map((choice, i) => {
        return (
          <p key={i} className="max-w-[30rem]">
            {" "}
            {choice.message.content}{" "}
          </p>
        );
      })}
    </main>
  );
}
