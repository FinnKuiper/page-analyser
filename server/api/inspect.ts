import { load } from "cheerio";
import axios from "axios";
import { createError } from "h3";
import { analyseHeadingOrder } from "./utils/analyse-heading-order";
import { analyseHeadingsContent } from "./utils/AI/analyse-heading-content";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const targetUrl = query.url as string | undefined;

    if (!targetUrl) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing 'url' query parameter",
        });
    }

    try {
        const response = await axios.get(targetUrl);
        const $ = load(response.data);
        const title = $("title").text();
        const icon = $("[rel='icon']").text();
        const headingOrder = analyseHeadingOrder($);
        const contentAnalysis = await analyseHeadingsContent(headingOrder.headings);
        console.log(contentAnalysis);
        return {
            url: targetUrl,
            title,
            icon,
            headingOrder,
            contentAnalysis,
        };
    } catch (err: any) {
        throw createError({
            statusCode: err?.response?.status ?? 500,
            statusMessage: err?.response?.statusText ?? "Failed to fetch target URL",
            data: {
                message: err?.message,
                status: err?.response?.status,
                statusText: err?.response?.statusText,
                headers: err?.response?.headers,
            },
        });
    }
});