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
      className="flex flex-col gap-2 max-w-[50%]"
    >
      <label>What can I help you with?</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        className="border-1 max-w-[100%] p-[1rem] block"
      />
      <input
        type="submit"
        className="border-1 p-2 max-w-25"
        disabled={isLoading}
      />
    </form>
  );
}
