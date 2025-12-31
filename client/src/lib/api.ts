export async function submitServiceInquiry(data: {
  name: string;
  email: string;
  service: string;
  message: string;
  page: string;
}) {
  const response = await fetch("/api/forms/service-inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit service inquiry");
  }

  return response.json();
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  page: string;
}) {
  const response = await fetch("/api/forms/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact form");
  }

  return response.json();
}

export async function submitNewsletterFooter(email: string) {
  const response = await fetch("/api/forms/newsletter-footer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe to newsletter");
  }

  return response.json();
}

export async function submitQuote(data: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  page: string;
}) {
  const response = await fetch("/api/forms/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit quote request");
  }

  return response.json();
}
