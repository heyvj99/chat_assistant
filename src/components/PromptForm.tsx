import { useState, useEffect } from "react";

export default function PromptForm({
  onPromptSubmit,
  isLoading,
  value,
}: {
  onPromptSubmit: (prompt: string) => Promise<void> | void | string;
  isLoading: boolean;
  value?: string;
}) {
  const [prompt, setPrompt] = useState("");

  // Update internal state when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setPrompt(value);
      if (value !== "") {
        document.getElementById("prompt-input")?.focus();
      }
    }
  }, [value]);

  // Use internal state for display and editing
  const displayValue = prompt;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (displayValue === "") {
          return;
        }

        onPromptSubmit(displayValue);
        setPrompt("");
      }}
      className="flex flex-col gap-2"
    >
      <div className="relative">
        <div className="absolute -top-1 -right-1 border-2 border-text-black pb-2 min-w-full min-h-full rounded-[30px] z-10 pointer-events-none"></div>
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="Ask me anything under the sun..."
          className="placeholder:text-text-black font-medium whimsical-input w-full pr-14 text-lg"
          disabled={isLoading}
          id="prompt-input"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || displayValue === ""}
          className="whimsical-button absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <img
            src="/Icons/guidance_sendIcon.svg"
            alt="Send"
            className="w-5 h-5"
          />
        </button>
      </div>
      <span className="text-xs font-medium px-2.5 text-text-black/90">
        Only wrong answers supported
      </span>
    </form>
  );
}
