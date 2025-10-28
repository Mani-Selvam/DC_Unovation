const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678/webhook';

export async function forwardToN8n(path: string, data: any): Promise<void> {
  try {
    const url = `${N8N_BASE_URL}/${path}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`n8n webhook error (${path}):`, response.status, response.statusText);
    }
  } catch (error) {
    console.error(`Failed to forward to n8n (${path}):`, error);
  }
}
