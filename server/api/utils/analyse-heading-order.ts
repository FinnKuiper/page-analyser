import { load } from "cheerio";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingItem {
    level: HeadingLevel;
    text: string;
    index: number;
}

interface HeadingOrderAnalysis {
    headings: HeadingItem[];
    outline: string;
    issues: string[];
    summary: {
        total: number;
        byLevel: Record<string, number>;
        hasH1: boolean;
        h1Count: number;
    };
}

export function analyseHeadingOrder($: ReturnType<typeof load>): HeadingOrderAnalysis {
    const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const headings: HeadingItem[] = [];
    const byLevel: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 };
    const issues: string[] = [];

    $("body")
        .find(headingTags.join(","))
        .each((index, el) => {
            const tagName = el.tagName?.toLowerCase();
            if (!tagName || !tagName.startsWith("h")) return;
            const level = parseInt(tagName.slice(1), 10) as HeadingLevel;
            if (level < 1 || level > 6) return;
            const text = $(el).text().trim();
            headings.push({ level, text, index });
            byLevel[String(level)] = (byLevel[String(level)] ?? 0) + 1;
        });

    // Build outline and detect order issues
    let outline = "";
    let prevLevel = 0;
    for (let i = 0; i < headings.length; i++) {
        const item = headings[i]!;
        const { level, text } = item;
        const indent = "  ".repeat(level - 1);
        outline += `${indent}H${level}: ${text || "(empty)"}\n`;

        if (level > prevLevel && level - prevLevel > 1)
            issues.push(`Heading skip: H${prevLevel} → H${level} at position ${i + 1} ("${text.slice(0, 40)}${text.length > 40 ? "…" : ""}")`);
        prevLevel = level;
    }

    const h1Count = byLevel["1"] ?? 0;
    if (h1Count === 0) issues.push("Page has no H1.");
    else if (h1Count > 1) issues.push(`Page has ${h1Count} H1(s). Consider a single H1 per page.`);

    return {
        headings,
        outline: outline.trim() || "(no headings found)",
        issues,
        summary: {
            total: headings.length,
            byLevel,
            hasH1: h1Count > 0,
            h1Count,
        },
    };
}