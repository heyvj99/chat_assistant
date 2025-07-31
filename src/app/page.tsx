"use client";
import PromptForm from "@/components/PromptForm";
import { useState, useEffect, useRef } from "react";

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
  const [tone, setTone] = useState<string>("Funny");
  const [qnaArr, setqnaArr] = useState<QnA[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new Q&A is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [qnaArr, isThinking]);

  return (
    <main className="whimsical-container flex flex-col h-screen">
      {/* Header */}
      <div className="flex-shrink-0 p-4">
        <div className="flex items-center justify-center pt-8">
          <h1 className="whimsical-title text-2xl md:text-3xl text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-text-black font-bold text-3xl">
                Delulu AI
              </span>
              <span className="text-text-black font-medium text-sm">
                Boldly taking on the world, one wrong answer at a time.
              </span>
            </div>
          </h1>
        </div>
        {/* <p className="text-center text-text-black font-medium text-sm mt-2">
          Start asking questions to get some (wrong) answers!
        </p> */}
      </div>

      {/* Chat History - Takes up remaining space */}
      <div
        ref={chatContainerRef}
        className={`overflow-y-auto scrollbar-hide ${
          qnaArr.length === 0 ? "h-fit" : "flex-1"
        } p-4 pb-16`}
      >
        <div className="px-4 max-w-[min(100%,42rem)] mx-auto space-y-4 flex flex-col justify-end">
          {qnaArr.length === 0 ? (
            // placeholder for when no questions have been asked
            <div className="space-y-4 mt-8">
              <div className="text-center text-text-black font-medium mb-6">
                <p>Start asking questions to get some wrong answers!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background-purple border-2 border-bright-purple p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                  <p className="text-text-black text-center font-semibold text-sm">
                    Is there real gold in California?
                  </p>
                </div>
                <div className="bg-background-purple border-2 border-bright-purple p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                  <p className="text-text-black text-center font-semibold text-sm">
                    Why do whales migrate from the Arctic?
                  </p>
                </div>
                <div className="bg-background-purple border-2 border-bright-purple p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                  <p className="text-text-black text-center font-semibold text-sm">
                    How do I get rich?
                  </p>
                </div>
              </div>
            </div>
          ) : (
            [...qnaArr].reverse().map((qna, i) => {
              return (
                <div key={i} className="whimsical-card p-6">
                  <p className="text-md font-extrabold text-text-black mb-3 sentence-case">
                    {qna.userPrompt}
                  </p>
                  <p className="text-text-black leading-relaxed font-medium">
                    {qna.choiceArr[0].message.content}
                  </p>
                </div>
              );
            })
          )}

          {/* Thinking state placeholder */}
          {isThinking && (
            <div className="whimsical-card p-6">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[var(--color-fresh-orange)] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[var(--color-fresh-orange)] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[var(--color-fresh-orange)] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-text-black font-medium">
                  Cooking up some wrong answers...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form - Fixed at bottom */}
      <div className="flex-shrink-0 p-4">
        <div className="max-w-[min(100%,42rem)] mx-auto pb-8">
          <PromptForm
            isLoading={isLoading}
            onPromptSubmit={async (prompt: string) => {
              setIsLoading(true);
              setIsThinking(true);

              // Add a delay to simulate thinking
              await new Promise((resolve) => setTimeout(resolve, 2000));

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

              const newqnaArr = [newqna[0], ...qnaArr];

              await setqnaArr(newqnaArr);
              setIsLoading(false);
              setIsThinking(false);

              console.log("RESPONSE", result);
              console.log("QnA_Arr", qnaArr);
            }}
          />
        </div>
      </div>
    </main>
  );
}
