import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authApi } from "../api/authApi";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,}$/;

export function RecoveryPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canRequestCode = isEmailValid && !isSubmitting;
  const canResetPassword = code.length === 6 && isPasswordValid && doPasswordsMatch && !isSubmitting;

  async function handleRequestCode(event) {
    event.preventDefault();

    if (!canRequestCode) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await authApi.requestPasswordRecovery(email);
      setStep(2);
    } catch (apiError) {
      setError(apiError.message || "Не вдалося надіслати код");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();

    if (!canResetPassword) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await authApi.resetPassword({ email, code, newPassword: password });
      navigate("/login", { replace: true, state: { message: "Пароль змінено. Увійдіть з новим паролем." } });
    } catch (apiError) {
      setError(apiError.message || "Не вдалося змінити пароль");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="recovery-title">
        <p className="auth-eyebrow">Повернення доступу</p>
        <h1 id="recovery-title">Відновлення паролю</h1>
        <p className="auth-subtitle">
          {step === 1 ? "Введіть пошту, і ми надішлемо код." : "Введіть код з листа і новий пароль."}
        </p>

        {step === 1 ? (
          <form className="auth-form" onSubmit={handleRequestCode} noValidate>
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                aria-invalid={email.length > 0 && !isEmailValid}
                onChange={(event) => setEmail(event.target.value)}
              />
              {email.length > 0 && !isEmailValid ? <small>Невірний формат пошти</small> : null}
            </label>

            {error ? <p className="auth-error" role="alert">{error}</p> : null}

            <button className="auth-submit" type="submit" disabled={!canRequestCode}>
              {isSubmitting ? "Надсилаємо..." : "Надіслати код"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleResetPassword} noValidate>
            <label className="auth-field">
              <span>Код із листа</span>
              <input
                className="auth-code-input"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase().slice(0, 6))}
              />
            </label>

            <label className="auth-field">
              <span>Новий пароль</span>
              <div className="auth-password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Мін. 8 символів"
                  value={password}
                  aria-invalid={password.length > 0 && !isPasswordValid}
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
              {password.length > 0 && !isPasswordValid ? (
                <small>Мінімум 8 символів, літера і спецсимвол</small>
              ) : null}
            </label>

            <label className="auth-field">
              <span>Повторіть пароль</span>
              <div className="auth-password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Повторіть пароль"
                  value={confirmPassword}
                  aria-invalid={confirmPassword.length > 0 && !doPasswordsMatch}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  {showConfirmPassword ? "Сховати" : "Показати"}
                </button>
              </div>
              {confirmPassword.length > 0 && !doPasswordsMatch ? (
                <small>Паролі не співпадають</small>
              ) : null}
            </label>

            {error ? <p className="auth-error" role="alert">{error}</p> : null}

            <button className="auth-submit" type="submit" disabled={!canResetPassword}>
              {isSubmitting ? "Зберігаємо..." : "Зберегти пароль"}
            </button>
          </form>
        )}

        <div className="auth-links">
          <Link to="/login">Повернутись до входу</Link>
          <Link to="/register">Реєстрація</Link>
        </div>
      </section>
    </main>
  );
}
