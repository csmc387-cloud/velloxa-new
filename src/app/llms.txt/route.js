export async function GET() {
  const content = `# Velloxa Agency

> Velloxa (https://veloxa.io) is a digital engineering and growth agency specializing in custom AI integration, high-performance web systems, and passion marketing for modern SMEs.

Velloxa bridges the gap between frontier artificial intelligence workflows and production-grade web systems to scale client operations and revenue.

## Core Services

- [AI Integration](https://veloxa.io/#ai-integration): Custom LLM agents, 24/7 client intake pipelines, internal RAG knowledge bases, and automated multi-agent business workflows.
- [Web Engineering](https://veloxa.io/#web-engineering): High-performance, mobile-first web applications built on Next.js, React, and Tailwind CSS with sub-second LCP.
- [Passion Marketing](https://veloxa.io/#passion-marketing): High-tier SEO, GEO (Generative Engine Optimization), conversion rate optimization (CRO), and organic reach.

## Key Links

- [Home](https://veloxa.io/): Main agency landing page, brand mission, and live metrics.
- [Solutions](https://veloxa.io/#solutions): Comprehensive breakdown of service offerings and architectures.
- [Book Consultation](https://veloxa.io/#contact): Multi-step interactive client intake to schedule a growth audit.
- [XML Sitemap](https://veloxa.io/sitemap.xml): Complete index of canonical site URLs.
- [Robots Policy](https://veloxa.io/robots.txt): Machine crawling permissions and directives.

## Optional

- [Instagram](https://www.instagram.com/velloxa.agency/): Official agency social media profile.
- [Contact Email](mailto:velloxa.agency@gmail.com): Direct client inquiry inbox.
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
