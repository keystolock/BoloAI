export async function GET() {
  return new Response('google-site-verification: googlea3e2a41145085b67.html', {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}