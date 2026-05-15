import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserPageStyles.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+380\d{9}$/;
const PASS_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateUserData = (data) => {
  const isEmailValid = EMAIL_REGEX.test(data.email);
  const isPhoneValid = PHONE_REGEX.test(data.phone) || data.phone.length === 0; 
  const isNameValid = data.name.trim().length > 1;
  const isAddressValid = data.address.trim().length > 5;
  const isPassValid = PASS_REGEX.test(data.password);

  const isValid = isEmailValid && isPhoneValid && isNameValid && isAddressValid && isPassValid;

  return {
    isEmailValid,
    isPhoneValid,
    isNameValid,
    isAddressValid,
    isPassValid,
    isValid
  };
};

export function UserPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: 'Name',
    email: 'email@gmail.com',
    address: 'Address',
    phone: '+380991234567',
    password: 'password123'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Стан для перемикання видимості пароля в інпуті
  const [showPassword, setShowPassword] = useState(false);

  const { isEmailValid, isPhoneValid, isPassValid, isValid: canSave } = validateUserData(formData);

  useEffect(() => {
    let timer;
    if (showDeleteModal && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showDeleteModal, countdown]);

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
    setCountdown(5);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      navigate("/");
    }, 2000);
  };

  const handlePhoneInputChange = (e) => {
    const input = e.target.value;
    if (!input.startsWith('+380')) {
      setFormData({ ...formData, phone: '+380' });
      return;
    }
    const digitsOnly = input.slice(4).replace(/\D/g, '');
    setFormData({ ...formData, phone: '+380' + digitsOnly.slice(0, 9) });
  };

  const renderRow = (label, field) => {
    const hasError = 
      (field === 'email' && formData.email.length > 0 && !isEmailValid) ||
      (field === 'phone' && formData.phone.length > 4 && !isPhoneValid) ||
      (field === 'password' && formData.password.length > 0 && !isPassValid);

    return (
      <div className="info-row" key={field}>
        <div className="text-stack" style={{ width: '100%' }}>
          <span className="field-label">{label}</span>
          {isEditing ? (
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                className="input-style"
                type={field === "password" && !showPassword ? "password" : "text"}
                style={{ 
                  border: hasError ? '1px solid #ff4d4d' : 'none',
                  paddingRight: field === 'password' ? '45px' : '10px'
                }}
                value={formData[field]}
                onChange={(e) => field === 'phone' 
                  ? handlePhoneInputChange(e) 
                  : setFormData({ ...formData, [field]: e.target.value })
                }
              />
              
              {/* Іконка Ока: Рендериться виключно всередині інпуту пароля під час редагування */}
              {field === 'password' && (
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-eye"
                  title={showPassword ? "Приховати пароль" : "Показати пароль"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              )}

              {hasError && (
                <span style={{ color: '#ff4d4d', fontSize: '10px', display: 'block', marginTop: '4px' }}>
                  {field === 'email' && 'Невірний формат пошти'}
                  {field === 'phone' && 'Формат: 9 цифр після +380'}
                  {field === 'password' && 'Мін. 8 симв, велика літера, цифра, спецсимвол'}
                </span>
              )}
            </div>
          ) : (
            <span className="field-value">
              {field === "password" ? "********" : userData[field]}
            </span>
          )}
        </div>
        {!isEditing && (
          <button 
            className="edit-link" 
            onClick={() => { 
              setFormData({ ...userData }); 
              setIsEditing(true); 
              setShowPassword(false); // Завжди ховаємо пароль перед початком нового редагування
            }}
          >
            Змінити
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      {isDeleting && (
        <div className="overlay-loader">
          <div className="loader-box"><h2>Видалення аккаунту...</h2></div>
        </div>
      )}

      {showDeleteModal && (
        <div className="overlay-loader">
          <div className="modal-box">
            <h2 style={{color: '#1f2937'}}>Ви впевнені?</h2>
            <p style={{color: '#6b7280', margin: '20px 0'}}>Ви збираєтеся видалити свій профіль.</p>
            <div className="modal-buttons">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-modal-btn">Скасувати</button>
              <button 
                disabled={countdown > 0} 
                onClick={confirmDelete}
                className="confirm-delete-btn"
                style={{ backgroundColor: countdown > 0 ? '#fca5a5' : '#ef4444' }}
              >
                Видалити {countdown > 0 ? `(${countdown})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="page-title">Персональний кабінет</h1>
      
      <div className="layout-wrapper">
        <aside className="sidebar">
          <div className="avatar-wrapper">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          <div className="menu-list">
            <button className="menu-btn active">Мій профіль</button>
            <button className="menu-btn" onClick={() => navigate("/admin")}>Адмін панель</button>
            <button className="menu-btn" onClick={() => navigate("/history")}>Історія покупок</button>
          </div>
        </aside>

        <section className="info-card">
          <div>
            <h2 className="card-header">Інформація</h2>
            <div className="rows-container">
              {renderRow("Ім'я", "name")}
              {renderRow("Електронна пошта", "email")}
              {renderRow("Адреса проживання", "address")}
              {renderRow("Номер телефону", "phone")}
              {renderRow("Пароль", "password")}
            </div>
          </div>

          <div className="button-action-row">
            {isEditing ? (
              <>
                <button 
                  disabled={!canSave} 
                  onClick={() => { setUserData({...formData}); setIsEditing(false); }} 
                  className="btn btn-green"
                  style={{ opacity: canSave ? 1 : 0.5 }}
                >
                  Зберегти зміни
                </button>
                <button onClick={() => { setFormData({...userData}); setIsEditing(false); }} className="btn btn-gray">
                  Скасувати
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/")} className="btn btn-blue">Вийти</button>
                <button onClick={handleOpenDeleteModal} className="btn btn-red">Видалити аккаунт</button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}