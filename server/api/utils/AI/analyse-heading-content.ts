import { HeadingItem } from "../analyse-heading-order";
import OpenAI from "openai";

export async function analyseHeadingsContent(headings: HeadingItem[]) {
    const config = useRuntimeConfig();

    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: config.openrouterApiKey,
        defaultHeaders: {
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Lathi"
        }
    });

    const headingsList = headings.map(h => `H${h.level}: ${h.text}`).join(" | ");

    const prompt = `
You are a Media Psychologist. Analyze these website headings for:
1. Cognitive Load (Hick's Law)
2. Benefit Framing (Self-relevance)
3. Anxiety Triggers (Trust)

Headings: ${headingsList}

Return a JSON object with:
{
  "score": number,
  "summary": "string",
  "critique": [
    { "heading": "string", "issue": "string", "fix": "string", "psych_principle": "string" }
  ]
}
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        })

        return JSON.parse(response.choices[0]?.message.content ?? "{}")
    } catch (error) {
        console.error(error);
        return {
            score: 0,
            summary: "Error analysing headings content",
            critique: [],
        }
    }
}