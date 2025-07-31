import { useState } from "react";

export default function PromptForm({
  onPromptSubmit,
  isLoading,
}: {
  onPromptSubmit: (prompt: string) => Promise<void> | void | string;
  isLoading: boolean;
}) {
  const [prompt, setPrompt] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (prompt === "") {
          return;
        }

        onPromptSubmit(prompt);
        setPrompt("");
      }}
      className="flex flex-col gap-4"
    >
      <div className="relative">
        <div className="absolute -top-1 -right-1 border-2 border-text-black pb-2 min-w-full min-h-full rounded-[30px] z-10 pointer-events-none"></div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="Ask me anything under the sun..."
          className="placeholder:text-text-black whimsical-input w-full pr-14 text-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || prompt === ""}
          className="whimsical-button absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <img
            src="/Icons/guidance_sendIcon.svg"
            alt="Send"
            className="w-5 h-5"
          />
        </button>
      </div>
    </form>
  );
}
