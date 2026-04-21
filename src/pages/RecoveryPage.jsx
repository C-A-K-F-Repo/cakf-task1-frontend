import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RecoveryPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isPassValid = passRegex.test(password);
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Відновлення</h2>

        <div style={formStyle}>
          {step === 1 && (
            <>
              <p style={subtitleStyle}>Введіть пошту для отримання коду</p>
              <div style={inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  style={{ 
                    ...inputStyle, 
                    border: email.length > 0 && !isEmailValid ? '1px solid #ff4d4d' : 'none' 
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email.length > 0 && !isEmailValid && <span style={errorText}>Невірний формат пошти</span>}
              </div>
              <button 
                disabled={!isEmailValid}
                style={{ ...buttonStyle, opacity: isEmailValid ? 1 : 0.5 }} 
                onClick={() => setStep(2)}
              >
                Надіслати код
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p style={subtitleStyle}>Введіть 6 цифр із листа</p>
              <input
                type="text"
                placeholder="000000" 
                style={{ ...inputStyle, textAlign: 'center', letterSpacing: '5px', fontSize: '20px' }}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
              />
              <button 
                disabled={code.length !== 6}
                style={{ ...buttonStyle, opacity: code.length === 6 ? 1 : 0.5 }} 
                onClick={() => setStep(3)}
              >
                Підтвердити
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p style={subtitleStyle}>Встановіть новий пароль</p>
              
              <div style={inputGroup}>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Новий пароль"
                    style={{ 
                      ...inputStyle, 
                      border: password.length > 0 && !isPassValid ? '1px solid #ff4d4d' : 'none' 
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span style={eyeIconStyle} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                {password.length > 0 && !isPassValid && (
                  <span style={errorText}>Мін. 8 симв, велика літера, цифра, спецсимвол</span>
                )}
              </div>

              <div style={inputGroup}>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Повторіть пароль"
                    style={{ 
                      ...inputStyle, 
                      border: confirmPassword.length > 0 && !doPasswordsMatch ? '1px solid #ff4d4d' : 'none' 
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span style={eyeIconStyle} onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                {confirmPassword.length > 0 && !doPasswordsMatch && (
                  <span style={errorText}>Паролі не співпадають</span>
                )}
              </div>

              <button 
                disabled={!(isPassValid && doPasswordsMatch)}
                style={{ ...buttonStyle, opacity: (isPassValid && doPasswordsMatch) ? 1 : 0.5 }} 
                onClick={() => { alert('Пароль змінено!'); navigate('/login'); }}
              >
                Зберегти пароль
              </button>
            </>
          )}
        </div>

        <div style={footerStyle}>
          <p style={linkStyle} onClick={() => navigate('/login')}>
            Повернутись до входу
          </p>
          <p style={linkStyle} onClick={() => navigate('/register')}>
            Повернутись до реєстрації
          </p>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '100vh', 
  background: '#ffffff', 
  fontFamily: 'Inter, sans-serif' 
};

const cardStyle = { 
  background: '#fff', 
  padding: '60px 45px', 
  borderRadius: '32px', 
  width: '100%', 
  maxWidth: '500px', 
  textAlign: 'center', 
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)' 
};

const titleStyle = { 
  fontSize: '28px', 
  fontWeight: '700', 
  marginBottom: '30px', 
  color: '#333' 
};

const formStyle = { 
  display: 'flex',
   flexDirection: 'column',
    gap: '15px' 
};

const inputGroup = { 
  display: 'flex', 
  flexDirection: 'column', 
  textAlign: 'left', 
  gap: '4px', 
  position: 'relative' 
};

const inputStyle = { 
  background: '#f4f4f7',
  border: '1px solid transparent', 
  borderRadius: '16px', 
  padding: '20px', 
  fontSize: '16px', 
  outline: 'none', 
  width: '100%', 
  boxSizing: 'border-box', 
  color: '#1a1a1a',
  transition: '0.2s border-color'
};

const errorText = { 
  color: '#ff4d4d', 
  fontSize: '10px', 
  marginLeft: '10px', 
  fontWeight: '500' 
};

const eyeIconStyle = { 
  position: 'absolute', 
  right: '20px', 
  top: '50%', 
  transform: 'translateY(-50%)', 
  cursor: 'pointer', 
  opacity: 0.4 
};

const buttonStyle = { 
  background: '#7ba3ff', 
  color: '#fff', 
  border: 'none', 
  borderRadius: '15px', 
  padding: '18px', 
  fontSize: '16px', 
  fontWeight: '600', 
  cursor: 'pointer', 
  marginTop: '10px', 
  boxShadow: '0 8px 20px rgba(123, 163, 255, 0.3)', 
  transition: '0.3s' 
};

const stepHintStyle = { 
  fontSize: '14px', 
  color: '#666', 
  marginBottom: '10px' 
};

const agreementStyle = { 
  fontSize: '11px', 
  color: '#aaa', 
  marginTop: '15px', 
  lineHeight: '1.5' 
};

const footerStyle = { 
  marginTop: '25px', 
  fontSize: '14px',
  display: 'flex',         
  justifyContent: 'space-between',
  alignItems: 'center' 
};

const linkStyle = { 
  color: '#7ba3ff', 
  fontWeight: '600', 
  cursor: 'pointer' 
};

const subtitleStyle = { 
  color: '#666', 
  fontSize: '14px', 
  marginBottom: '25px' 
};

const linkSpan = { 
  color: '#7ba3ff', 
  fontWeight: '600', 
  cursor: 'pointer' 
};

const footerLink = { color: '#666' };