import { useState } from "react";
import { Link } from "react-router-dom";

import { authApi } from "../api/authApi";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,}$/;

export function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+380");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFullNameValid = fullName.trim().length >= 3;
  const isDobValid = Boolean(dob);
  const isEmailValid = emailRegex.test(email);
  const isPhoneValid = phoneNumber.length === 13;
  const isPasswordValid = passwordRegex.test(password);
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isAddressValid = deliveryAddress.trim().length > 5;
  const canSubmit =
    isFullNameValid &&
    isDobValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    doPasswordsMatch &&
    isAddressValid &&
    !isSubmitting;

  function handlePhoneChange(event) {
    const input = event.target.value;
    if (!input.startsWith("+380")) {
      setPhoneNumber("+380");
      return;
    }

    const digitsOnly = input.slice(4).replace(/\D/g, "");
    setPhoneNumber(`+380${digitsOnly.slice(0, 9)}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await authApi.register({
        full_name: fullName.trim(),
        dob: new Date(`${dob}T00:00:00`).toISOString(),
        delivery_address: deliveryAddress.trim(),
        phone_number: phoneNumber,
        email,
        password
      });
      setRegisteredEmail(email);
    } catch (apiError) {
      setError(apiError.message || "Не вдалося зареєструватися");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (registeredEmail) {
    return (
      <main className="auth-page">
        <section className="auth-card auth-card--success" aria-labelledby="register-success-title">
          <p className="auth-eyebrow">Пошта майже готова</p>
          <h1 id="register-success-title">Перевірте email</h1>
          <p className="auth-subtitle">
            Ми надіслали посилання підтвердження на <strong>{registeredEmail}</strong>. Після
            підтвердження поверніться до входу.
          </p>
          <Link className="auth-submit auth-submit--link" to="/login">
            Перейти до входу
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="register-title">
        <p className="auth-eyebrow">Новий покупець</p>
        <h1 id="register-title">Реєстрація</h1>
        <p className="auth-subtitle">Створіть аккаунт і підтвердіть пошту з листа.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="auth-field">
            <span>ПІБ</span>
            <input
              type="text"
              placeholder="Прізвище Ім'я По батькові"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </label>

          <label className="auth-field">
            <span>Дата народження</span>
            <input type="date" value={dob} onChange={(event) => setDob(event.target.value)} />
          </label>

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

          <label className="auth-field">
            <span>Місце проживання</span>
            <input
              type="text"
              placeholder="Місто, вулиця, будинок"
              value={deliveryAddress}
              onChange={(event) => setDeliveryAddress(event.target.value)}
            />
          </label>

          <label className="auth-field">
            <span>Телефон</span>
            <input
              type="tel"
              value={phoneNumber}
              aria-invalid={phoneNumber.length > 4 && !isPhoneValid}
              onChange={handlePhoneChange}
            />
            {phoneNumber.length > 4 && !isPhoneValid ? (
              <small>Потрібно 9 цифр після +380</small>
            ) : null}
          </label>

          <label className="auth-field">
            <span>Пароль</span>
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

          <button className="auth-submit" type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Створюємо..." : "Продовжити"}
          </button>
        </form>

        <p className="auth-agreement">
          Натискаючи кнопку, ви даєте згоду на обробку персональних даних.
        </p>

        <div className="auth-links">
          <Link to="/login">Уже маєте аккаунт? Увійти</Link>
          <Link to="/recovery">Забули пароль?</Link>
        </div>
      </section>
    </main>
  );
}
