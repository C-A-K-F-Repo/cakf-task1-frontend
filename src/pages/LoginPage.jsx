import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/useAuth";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function getRedirectPath(location) {
  const from = location.state?.from;

  if (!from) {
    return "/";
  }

  return `${from.pathname}${from.search ?? ""}`;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = emailRegex.test(email);
  const canSubmit = isEmailValid && password.length > 0 && !isSubmitting;
  const redirectPath = getRedirectPath(location);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectPath, { replace: true });
    } catch (apiError) {
      setError(apiError.message || "Не вдалося увійти");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <p className="auth-eyebrow">CAKF SHOP</p>
        <h1 id="login-title">Вхід</h1>
        <p className="auth-subtitle">Увійдіть, щоб продовжити покупки.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              aria-invalid={email.length > 0 && !isEmailValid}
              onChange={(event) => setEmail(event.target.value)}
            />
            {email.length > 0 && !isEmailValid ? (
              <small>Невірний формат пошти</small>
            ) : null}
          </label>

          <label className="auth-field">
            <span>Пароль</span>
            <div className="auth-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ваш пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Сховати" : "Показати"}
              </button>
            </div>
          </label>

          {error ? <p className="auth-error" role="alert">{error}</p> : null}

          <button className="auth-submit" type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Входимо..." : "Увійти"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/register">Немає аккаунту? Реєстрація</Link>
          <Link to="/recovery">Забули пароль?</Link>
        </div>
      </section>
    </main>
  );
}
