const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

async function readResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}

function getErrorMessage(payload, fallback) {
  if (!payload) {
    return fallback;
  }

  if (typeof payload.detail === "string") {
    return payload.detail;
  }

  if (Array.isArray(payload.detail) && payload.detail.length > 0) {
    return payload.detail.map((item) => item.msg).join(". ");
  }

  return fallback;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers
    }
  });
  const payload = await readResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, "Запит не виконано"));
  }

  return payload;
}

function withBearerToken(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`
  };
}

export const authApi = {
  register(payload) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  login(email, password) {
    const formData = new URLSearchParams();
    formData.set("username", email);
    formData.set("password", password);

    return request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });
  },

  refresh(refreshToken) {
    const encodedRefreshToken = encodeURIComponent(refreshToken);

    return request(`/auth/refresh?refresh_token=${encodedRefreshToken}`, {
      method: "POST"
    });
  },

  getMe(accessToken) {
    return request("/auth/me", {
      headers: withBearerToken(accessToken)
    });
  },

  verifyEmail(token) {
    const encodedToken = encodeURIComponent(token);

    return request(`/auth/email/verify?token=${encodedToken}`, {
      method: "POST"
    });
  },

  requestEmailVerification(accessToken) {
    return request("/auth/email/request", {
      headers: withBearerToken(accessToken)
    });
  },

  requestPasswordRecovery(email) {
    return request("/account-recovery/request", {
      method: "POST",
      body: JSON.stringify({ email })
    });
  },

  resetPassword({ email, code, newPassword }) {
    return request("/account-recovery/reset", {
      method: "POST",
      body: JSON.stringify({
        email,
        code,
        new_password: newPassword
      })
    });
  }
};
