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

interface QnA {
  userPrompt: string;
  choiceArr: Choice[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tone, setTone] = useState<string>("");
  const [qnaArr, setqnaArr] = useState<QnA[]>([]);

  return (
    <main className="flex flex-col gap-2 items-center">
      <p className="text-3xl font-bold ">Hey! Wassup?</p>
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

          const newqna = [
            {
              choiceArr: result.choices,
              userPrompt: prompt,
            },
          ];

          const newqnaArr = qnaArr.concat(newqna);

          await setqnaArr(newqnaArr);
          setIsLoading(false);

          console.log("RESPONSE", result);
          console.log("QnA_Arr", qnaArr);
        }}
      />

      <div className="flex flex-col gap-3 max-w-[50%]">
        {qnaArr.map((qna, i) => {
          return (
            <div
              key={i}
              className="flex flex-col gap-0.5 bg-gray-100 p-4 rounded-2xl"
            >
              <p className="max-w-[30rem] text-[0.7rem] font-bold">
                {" "}
                {qna.userPrompt}
              </p>
              <p className="max-w-[30rem]">
                {" "}
                {qna.choiceArr[0].message.content}{" "}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
