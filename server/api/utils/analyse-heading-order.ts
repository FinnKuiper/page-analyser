import { load } from "cheerio";
import { CheckResult, computeScore, createChecklist, setCheck } from "./checklist";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingItem {
    level: HeadingLevel;
    text: string;
    index: number;
}

interface HeadingOrderAnalysis {
    headings: HeadingItem[];
    checklist: CheckResult[];
    score: number;
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
    const checks = createChecklist();

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
            setCheck(checks, "using-headers-to-structure-content", true);
        });

    // check if page is using a correct heading order
    let prevLevel = 0;
    for (let i = 0; i < headings.length; i++) {
        const item = headings[i]!;
        const { level } = item;
        if (level > prevLevel && level - prevLevel > 1) {
            setCheck(checks, "headers-in-correct-order", false);
        }
        prevLevel = level;
        setCheck(checks, "headers-in-correct-order", true);
    }

    const h1Count = byLevel["1"] ?? 0;
    if (h1Count === 1) {
        setCheck(checks, "page-has-a-title", true);
        setCheck(checks, "page-has-a-single-h1", true);
    };

    return {
        headings,
        checklist: checks,
        score: computeScore(checks),
        summary: {
            total: headings.length,
            byLevel,
            hasH1: h1Count > 0,
            h1Count,
        },
    };
}