/**
 * Health check endpoint on the single unified Cloudflare Pages link
 * Accessible at: https://<your-project>.pages.dev/health
 */
export async function onRequest() {
  return new Response(
    JSON.stringify({
      status: 'UP',
      architecture: 'Single-Link Full-Stack Cloudflare Pages',
      platform: 'Cloudflare Pages Functions',
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}
