import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPanelStyles.css";

const INITIAL_USERS = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Користувач ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  phone: `+38099${Math.floor(1000000 + Math.random() * 9000000)}`,
  birthday: `${Math.floor(1 + Math.random() * 28)}/0${Math.floor(1 + Math.random() * 9)}/199${Math.floor(Math.random() * 9)}`,
  status: i % 3 === 0 ? "Active" : "Pending"
}));

export function AdminPanel() {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [activeNotification, setActiveNotification] = useState(null);
  const [messageText, setMessageText] = useState("");
  
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSelectUser = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const currentUsersIds = currentUsers.map(u => u.id);
  const isAllCurrentSelected = currentUsersIds.length > 0 && currentUsersIds.every(id => selectedIds.includes(id));

  const handleSelectAllCurrent = () => {
    if (isAllCurrentSelected) {
      setSelectedIds(selectedIds.filter(id => !currentUsersIds.includes(id)));
    } else {
      const newSelected = [...selectedIds, ...currentUsersIds.filter(id => !selectedIds.includes(id))];
      setSelectedIds(newSelected);
    }
  };

  const handleOpenNotificationModal = (type, method) => {
    setActiveNotification({ type, method });
    setMessageText("");
  };

  const handleConfirmSendNotification = () => {
    if (!messageText.trim()) {
      alert("Будь ласка, введіть текст повідомлення!");
      return;
    }

    if (selectedIds.length > 0) {
      alert(`Розсилка [${activeNotification.type}] через [${activeNotification.method}] успішно відправлена вибраним користувачам (${selectedIds.length} чол.)\nТекст: "${messageText}"`);
      setSelectedIds([]);
    } else {
      alert(`МАСОВА РОЗСИЛКА! [${activeNotification.type}] через [${activeNotification.method}] успішно відправлена УСІМ користувачам бази даних (${users.length} чол.)\nТекст: "${messageText}"`);
    }

    setActiveNotification(null);
    setMessageText("");
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      setSelectedIds(selectedIds.filter(id => id !== userToDelete.id));
      setUserToDelete(null);

      const maxPage = Math.ceil(updatedUsers.length / usersPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
    }
  };

  return (
    <div className="admin-container">
      {userToDelete && (
        <div className="admin-overlay">
          <div className="admin-modal-box">
            <h2>Видалення користувача</h2>
            <p>Ви впевнені, що хочете видалити <strong>{userToDelete.name}</strong> (ID: {userToDelete.id}) з бази даних?</p>
            <div className="admin-modal-buttons">
              <button onClick={() => setUserToDelete(null)} className="admin-cancel-btn">
                Скасувати
              </button>
              <button onClick={handleDeleteUser} className="admin-confirm-btn">
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}

      {activeNotification && (
        <div className="admin-overlay">
          <div className="admin-modal-box admin-modal-wide">
            <h2>Відправка повідомлення ({activeNotification.method})</h2>
            <p className="modal-recipient-info">
              Тип: <strong>{activeNotification.type}</strong> | Кому: <strong>{selectedIds.length > 0 ? `Вибрані користувачі (${selectedIds.length} чол.)` : `УСІ користувачі бази (${users.length} чол.)`}</strong>
            </p>
            
            <div className="message-input-wrapper">
              <textarea
                className="admin-message-input"
                placeholder="Введіть текст вашого повідомлення тут..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows="4"
              />
            </div>

            <div className="admin-modal-buttons">
              <button onClick={() => setActiveNotification(null)} className="admin-cancel-btn">
                Скасувати
              </button>
              <button onClick={handleConfirmSendNotification} className="admin-confirm-btn btn-send-notification">
                Надіслати
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="sidebar">
        <div className="avatar-wrapper">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <div className="menu-list">
          <button className="menu-btn" onClick={() => navigate("/user")}>Мій профіль</button>
          <button className="menu-btn active">Адмін панель</button>
          <button className="menu-btn" onClick={() => navigate("/history")}>Історія покупок</button>
        </div>
      </aside>

      <main className="admin-main">
        <h1 className="page-title">Управління користувачами</h1>

        <div className="table-card">
          <table className="users-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <input 
                    type="checkbox" 
                    checked={isAllCurrentSelected} 
                    onChange={handleSelectAllCurrent}
                    disabled={currentUsers.length === 0}
                  />
                </th>
                <th>ID</th>
                <th>ПІБ</th>
                <th>Контакти</th>
                <th>День народження</th>
                <th>Керування</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className={selectedIds.includes(user.id) ? "row-selected" : ""}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(user.id)} 
                      onChange={() => handleSelectUser(user.id)} 
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-info-cell">
                      <span className="user-name">{user.name}</span>
                      <span className="user-status-dot" data-status={user.status}></span>
                    </div>
                  </td>
                  <td>
                    <div className="contact-stack">
                      <span>{user.email}</span>
                      <span className="phone-sub">{user.phone}</span>
                    </div>
                  </td>
                  <td>{user.birthday}</td>
                  <td>
                    <button 
                      onClick={() => setUserToDelete(user)}
                      className="emoji-action-btn color-dark-red"
                      title="Видалити користувача"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#9ca3af" }}>
                    Користувачів не знайдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
              className="pag-btn"
            >
              Назад
            </button>
            <span className="page-info">Сторінка {currentPage} з {totalPages || 1}</span>
            <button 
              disabled={currentPage === totalPages || totalPages === 0} 
              onClick={() => setCurrentPage(p => p + 1)}
              className="pag-btn"
            >
              Вперед
            </button>
          </div>

          {currentUsers.length > 0 && (
            <div className="admin-bottom-actions">
              <div className="bulk-actions-bar">
                <div className="bulk-group">
                  <span className="bulk-label">Знижки ({selectedIds.length > 0 ? "Вибраним" : `Всім користувачам (${users.length})`}):</span>
                  <button onClick={() => handleOpenNotificationModal("Знижка", "Email")} className="bulk-btn bulk-red">
                    Надіслати Email
                  </button>
                  <button onClick={() => handleOpenNotificationModal("Знижка", "SMS")} className="bulk-btn bulk-blue">
                    Надіслати SMS
                  </button>
                </div>
                
                <div className="bulk-group">
                  <span className="bulk-label">Привітання ({selectedIds.length > 0 ? "Вибраним" : `Всім користувачам (${users.length})`}):</span>
                  <button onClick={() => handleOpenNotificationModal("Привітання", "Email")} className="bulk-btn bulk-red">
                    Привітати по Email
                  </button>
                  <button onClick={() => handleOpenNotificationModal("Привітання", "SMS")} className="bulk-btn bulk-blue">
                    Привітати по SMS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}