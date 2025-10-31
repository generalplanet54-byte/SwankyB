export async function onRequestPost(context: any) {
  const { request, env } = context;
  try {
    const body = await request.json().catch(() => ({}));
    const topic = (body.topic || '').toString();
    const category = (body.category || 'General').toString();

    if (!topic) {
      return new Response(JSON.stringify({ error: 'Topic is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // If ANTHROPIC_API_KEY provided, call Claude Haiku to produce structured JSON.
    const anthropicKey = env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY?.value || '';
    if (anthropicKey) {
      try {
        const prompt = `You are an assistant that outputs a JSON object describing a complete SEO-optimized article for the topic: "${topic}" in the category: "${category}". Output only valid JSON with the following fields: title, excerpt, content (HTML string, use semantic tags like <h2>, <p>, <ul>, <li>), seoTitle, seoDescription, tags (array), readTime (e.g., '6 min read'), featuredImage (a URL). Ensure content is at least 6 sections and uses headings. Do not include any extra text outside the JSON.`;

        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 1200,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
          })
        });

        const json = await res.json();
        const contentText = json?.content?.[0]?.text || '';

        // Try to parse JSON from model output
        let parsed: any = null;
        try {
          parsed = JSON.parse(contentText);
        } catch (_e) {
          // If parse fails, fall back to simple template
          parsed = null;
        }

        if (parsed) {
          return new Response(JSON.stringify({ article: parsed }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
      } catch (err: any) {
        // Continue to fallback
        console.error('Anthropic Claude call failed:', err?.message || err);
      }
    }

    // Fallback generator (server-side simple template)
    const readTime = Math.floor(Math.random() * 8) + 4 + ' min read';
    const content = `
      <h2>Introduction to ${topic}</h2>
      <p>In this guide, we cover everything you need to know about ${topic} within the ${category} category.</p>
      <h2>Why ${topic} matters</h2>
      <p>Choosing the right ${topic} can improve outcomes and satisfaction. Consider these factors:</p>
      <ul>
        <li>Performance and quality</li>
        <li>Price and value</li>
        <li>Usability and support</li>
      </ul>
      <h2>Top picks</h2>
      <p>Below are our recommended options and what makes them stand out.</p>
      <h2>Buying guide</h2>
      <p>How to choose the best ${topic} for your needs.</p>
      <h2>Conclusion</h2>
      <p>Final thoughts and recommendations for ${topic} buyers.</p>
    `.trim();

    const article = {
      title: `The Ultimate Guide to ${topic}`,
      excerpt: `Everything you need to know about ${topic} in this comprehensive guide.`,
      content,
      seoTitle: `${topic} - Complete Guide & Reviews | SwankyBoyz`,
      seoDescription: `Find the best ${topic} products, expert reviews, and buying tips in our comprehensive guide.`,
      tags: [topic.toLowerCase(), category.toLowerCase(), 'guide'],
      readTime,
  featuredImage: `/images/articles/masculine-luxury.svg`,
      category
    };

    return new Response(JSON.stringify({ article }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
