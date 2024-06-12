import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import cheerio from 'cheerio';

interface MetaData {
    title: string;
    site_name: string;
    image: {
        url: string;
    };
}

// fetchUrl
export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const response = await axios.get(url as string);
        const html = response.data;

        // Load HTML content using Cheerio
        const $ = cheerio.load(html);

        // Extract meta tags
        let meta: any = {};
        $('meta').each(function () {
            const name = $(this).attr('name');
            const property = $(this).attr('property');
            const content = $(this).attr('content');

            if (name && content) {
                meta[name] = content;
            } else if (property && content) {
                meta[property] = content;
            }
        });

        meta = {
            ...meta,
            title: $('title').text(),
            site_name: meta['og:site_name'] || $('meta[name="og:site_name"]').attr('content') as unknown as string,
            image: {
                url: meta['og:image'] || $('meta[name="og:image"]').attr('content') as unknown as string
            } as unknown as { url: string },
        }

        // Return success response with metadata
        return NextResponse.json({
            success: 1,
            link: url,
            meta: meta,
        }, { status: 200 });
    } catch (error) {
        // Return error response if URL cannot be fetched or metadata cannot be extracted
        return NextResponse.json({
            success: 0,
            error: 'Failed to fetch metadata',
        }, { status: 500 });
    }
}


