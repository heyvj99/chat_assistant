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

  return (
    <main>
      <p className="text-3xl font-bold ">Hello</p>
      <PromptForm
        onSubmit={async (prompt: string) => {
          const response = await fetch("./api/chat-gpt/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: prompt,
            }),
          });

          const result = await response.json();
          setChoices(result.choices);

          console.log("RESPONSE", response);
        }}
      />

      {choices.map((choice) => {
        return (
          <p key={choice.index} className="max-w-[30rem]">
            {" "}
            {choice.message.content}{" "}
          </p>
        );
      })}
    </main>
  );
}
