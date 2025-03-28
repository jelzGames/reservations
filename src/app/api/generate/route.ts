import { NextResponse, NextRequest } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.3", 
      inputs: prompt,
      parameters: { max_new_tokens: 100 },
    });

    return NextResponse.json({ text: response.generated_text });
  } catch (error) {
    console.error("Error in Hugging Face API:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
