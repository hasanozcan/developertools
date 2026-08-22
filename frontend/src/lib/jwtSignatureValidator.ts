export function validateJwtStructure(jwtToken: string): {
  isValidStructure: boolean;
  header?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  signature?: string;
  isExpired?: boolean;
} {
  const parts = jwtToken.trim().split('.');
  if (parts.length !== 3) {
    return { isValidStructure: false };
  }

  try {
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const signature = parts[2];

    const exp = typeof payload.exp === 'number' ? payload.exp : undefined;
    const isExpired = exp ? Date.now() >= exp * 1000 : false;

    return {
      isValidStructure: true,
      header,
      payload,
      signature,
      isExpired,
    };
  } catch {
    return { isValidStructure: false };
  }
}
