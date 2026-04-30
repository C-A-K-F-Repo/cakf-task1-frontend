import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isPassValid = passRegex.test(password);
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isAddressValid = address.trim().length > 5;

  const canSubmit = isEmailValid && phone && isValidPhoneNumber(phone) && isPassValid && doPasswordsMatch && isAddressValid;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Реєстрація</h2>
        <p style={subtitleStyle}>Створіть свій аккаунт</p>

        <div style={formStyle}>
          <input type="text" placeholder="Прізвище, Ім'я, По батькові" style={inputStyle} />

          <div style={inputGroup}>
            <input
              type="email"
              placeholder="Email"
              style={{ ...inputStyle, border: email.length > 0 && !isEmailValid ? '1px solid #ff4d4d' : 'none' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email.length > 0 && !isEmailValid && <span style={errorText}>Невірний формат пошти</span>}
          </div>

          <input
            type="text"
            placeholder="Місце проживання"
            style={inputStyle}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div style={inputGroup}>
            <PhoneInput
              international
              style={{...inputStyle}}
              placeholder="Номер телефону"
              defaultCountry="UA"
              value={phone}
              onChange={setPhone}
            />
            {phone && !isValidPhoneNumber(phone) && (
              <span style={errorText}>Невірний формат</span>
            )}
          </div>

          <div style={inputGroup}>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Пароль"
                style={{ ...inputStyle, border: password.length > 0 && !isPassValid ? '1px solid #ff4d4d' : 'none' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span style={eyeIconStyle} onClick={() => setShowPass(!showPass)}>
                {showPass ? "👁️" : "👁️‍🗨️"}
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
                style={{ ...inputStyle, border: confirmPassword.length > 0 && !doPasswordsMatch ? '1px solid #ff4d4d' : 'none' }}
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
            disabled={!canSubmit}
            style={{ ...buttonStyle, opacity: canSubmit ? 1 : 0.5 }}
          >
            Продовжити
          </button>
        </div>

        <p style={agreementStyle}>
          Натискаючи кнопку «Продовжити», ви даєте згоду на <span style={linkSpan}>обробку персональних даних</span>
        </p>

        <div style={footerStyle}>
          <p style={footerLink}>
            Уже маєте аккаунт?{' '}
            <span style={linkSpan} onClick={() => navigate('/login')}>
              Увійти
            </span>
          </p>
          
          <p style={footerLink}>
            <span style={linkSpan} onClick={() => navigate('/recovery')}>
              Забули пароль?
            </span>
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
  color: '#ff9d5c', 
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