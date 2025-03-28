"use client";

import React from "react";
//import { useEffect } from "react";
//import { useRouter } from "next/navigation";
import { useState } from "react";
//import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import "../../globals.css";



export default function ContentGenerator() {
  //const { status } = useSession();
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  //const [loadingPage, setLoadingPage] = useState(true);
  //const router = useRouter();

  /*
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); 
    }
    else {
      setLoadingPage(false);
    }
  }, [status, router]);

  if (loadingPage) {
    return <p>Loading...</p>;
  }
*/
  async function handleGenerate() {
    if (!prompt) return;
    setLoading(true);
    setGeneratedText("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    
    const data = await response.json();
    setGeneratedText(data.text);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">AI Content Generator</h1>
      <Input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-lg"
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Content"}
      </Button>
      {generatedText && (
        <Card className="w-full max-w-lg mt-4">
          <CardContent className="p-4">
            <p>{generatedText}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
