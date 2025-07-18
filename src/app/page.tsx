"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <p className="text-3xl font-bold ">Hello world!</p>
      <Button
        variant="destructive"
        onClick={async () => {
          const response = await fetch("./api/chat-gpt/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              someData: true,
            }),
          });

          console.log("RESPONSE", response);
        }}
      >
        {" "}
        Hit API{" "}
      </Button>
    </main>
  );
}
