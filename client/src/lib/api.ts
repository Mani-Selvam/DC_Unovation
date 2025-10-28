export async function submitLeadTracking(data: {
  page: string;
  action: string;
  name?: string;
  email?: string;
}) {
  const response = await fetch("/api/forms/lead-tracking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit lead tracking");
  }

  return response.json();
}

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

export async function submitProjectInterest(data: {
  project: string;
  name: string;
  email: string;
  message?: string;
  page: string;
}) {
  const response = await fetch("/api/forms/project-interest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit project interest");
  }

  return response.json();
}

export async function submitJobApplication(data: {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
}) {
  const response = await fetch("/api/forms/job-application", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit job application");
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
