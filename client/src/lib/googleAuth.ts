export interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
}

const STORAGE_KEY = "dcunovation_user";

export function getStoredUser(): GoogleUser | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: GoogleUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

export function simulateGoogleLogin(): GoogleUser {
  const mockUser: GoogleUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  };
  storeUser(mockUser);
  return mockUser;
}
