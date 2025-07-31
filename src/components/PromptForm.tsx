import { useState, useEffect } from "react";

export default function PromptForm({
  onPromptSubmit,
  isLoading,
  value,
  onValueChange,
}: {
  onPromptSubmit: (prompt: string) => Promise<void> | void | string;
  isLoading: boolean;
  value?: string;
  onValueChange?: (newValue: string) => void;
}) {
  const [prompt, setPrompt] = useState("");

  // Update internal state when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setPrompt(value);
    }
  }, [value]);

  // Use the external value if provided, otherwise use internal state
  const displayValue = value !== undefined ? value : prompt;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPrompt(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (displayValue === "") {
          return;
        }

        onPromptSubmit(displayValue);
        setPrompt("");
        if (onValueChange) {
          onValueChange("");
        }
      }}
      className="flex flex-col gap-4"
    >
      <div className="relative">
        <div className="absolute -top-1 -right-1 border-2 border-text-black pb-2 min-w-full min-h-full rounded-[30px] z-10 pointer-events-none" />
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder="Ask me anything under the sun..."
          className="placeholder:text-text-black font-medium whimsical-input w-full pr-14 text-lg"
          disabled={isLoading}
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
    </form>
  );
}
