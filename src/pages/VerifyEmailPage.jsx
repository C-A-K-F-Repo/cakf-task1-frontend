import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { authApi } from "../api/authApi";

const VERIFY_EMAIL_SESSION_PREFIX = "cakf.verifyEmail.";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Підтверджуємо вашу пошту...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Посилання підтвердження не містить токен.");
      return;
    }

    const sessionKey = `${VERIFY_EMAIL_SESSION_PREFIX}${token}`;
    if (window.sessionStorage.getItem(sessionKey) === "success") {
      setStatus("success");
      setMessage("Пошту підтверджено. Тепер можна увійти в аккаунт.");
      return;
    }

    let isMounted = true;

    async function verifyEmail() {
      try {
        await authApi.verifyEmail(token);
        if (isMounted) {
          window.sessionStorage.setItem(sessionKey, "success");
          setStatus("success");
          setMessage("Пошту підтверджено. Тепер можна увійти в аккаунт.");
        }
      } catch (apiError) {
        if (isMounted) {
          setStatus("error");
          setMessage(apiError.message || "Не вдалося підтвердити пошту.");
        }
      }
    }

    verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return (
    <main className="auth-page">
      <section className="auth-card auth-card--success" aria-labelledby="verify-email-title">
        <p className="auth-eyebrow">Email verification</p>
        <h1 id="verify-email-title">
          {status === "loading" ? "Зачекайте" : status === "success" ? "Пошту підтверджено" : "Помилка"}
        </h1>
        <p className="auth-subtitle">{message}</p>

        {status !== "loading" ? (
          <Link className="auth-submit auth-submit--link" to="/login">
            Перейти до входу
          </Link>
        ) : null}
      </section>
    </main>
  );
}
