import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderHistoryStyles.css";

const INITIAL_ORDERS = [
  { id: "UA-77401", date: "12.05.2026", items: "Кросівки Nike Air Max, Шкарпетки Sport (3 паки)", total: "4 200 ₴", status: "Доставлено" },
  { id: "UA-76912", date: "28.04.2026", items: "Худі Oversize Black, Кепка Сlassic", total: "2 150 ₴", status: "Доставлено" },
  { id: "UA-75344", date: "10.04.2026", items: "Спортивні штани Tech Fleece", total: "2 800 ₴", status: "Доставлено" },
  { id: "UA-74211", date: "15.03.2026", items: "Рюкзак Urban Explorer", total: "1 450 ₴", status: "Доставлено" },
  { id: "UA-73190", date: "22.02.2026", items: "Зимова куртка Down Jacket, Рукавиці", total: "6 900 ₴", status: "Доставлено" },
  { id: "UA-72004", date: "05.02.2026", items: "Футболка Basic White (2 шт)", total: "900 ₴", status: "Доставлено" },
  { id: "UA-71182", date: "18.01.2026", items: "Термобілизна Set Pro", total: "1 650 ₴", status: "Доставлено" },
  { id: "UA-70029", date: "29.12.2025", items: "Подарунковий сертифікат, Шарф", total: "1 200 ₴", status: "Доставлено" }
];

export function OrderHistory() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleSelectOrder = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const currentOrdersIds = currentOrders.map(o => o.id);
  const isAllCurrentSelected = currentOrdersIds.length > 0 && currentOrdersIds.every(id => selectedIds.includes(id));

  const handleSelectAllCurrent = () => {
    if (isAllCurrentSelected) {
      setSelectedIds(selectedIds.filter(id => !currentOrdersIds.includes(id)));
    } else {
      const newSelected = [...selectedIds, ...currentOrdersIds.filter(id => !selectedIds.includes(id))];
      setSelectedIds(newSelected);
    }
  };

  const handleDeleteAction = () => {
    let updated;
    if (selectedIds.length > 0) {
      updated = orders.filter((order) => !selectedIds.includes(order.id));
      setSelectedIds([]);
    } else {
      updated = orders.filter((order) => !currentOrdersIds.includes(order.id));
    }
    
    setOrders(updated);

    const maxPage = Math.ceil(updated.length / ordersPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  };

  return (
    <div className="history-container">
      <aside className="sidebar">
        <div className="avatar-wrapper">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <div className="menu-list">
          <button className="menu-btn" onClick={() => navigate("/user")}>Мій профіль</button>
          <button className="menu-btn" onClick={() => navigate("/admin")}>Адмін панель</button>
          <button className="menu-btn active">Історія покупок</button>
        </div>
      </aside>

      <main className="history-main">
        <h1 className="page-title">Історія покупок</h1>

        <div className="orders-card">
          <div className="orders-list">
            {currentOrders.map((order) => (
              <div className={`order-item ${selectedIds.includes(order.id) ? "selected" : ""}`} key={order.id}>
                
                <div className="order-checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    className="order-checkbox"
                    checked={selectedIds.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </div>

                <div className="order-content-wrapper">
                  <div className="order-header">
                    <div className="order-meta">
                      <span className="order-id">Замовлення #{order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <span className="order-status">{order.status}</span>
                  </div>
                  
                  <div className="order-body">
                    <p className="order-items-text">{order.items}</p>
                    <div className="order-total-row">
                      <span className="total-label">Сума замовлення:</span>
                      <span className="total-price">{order.total}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}

            {orders.length === 0 && (
              <div className="empty-orders">
                <p>Історія замовлень порожня.</p>
              </div>
            )}
          </div>

          {currentOrders.length > 0 && (
            <div className="history-bottom-bar">
              <label className="checkbox-label select-all-label">
                <input 
                  type="checkbox" 
                  checked={isAllCurrentSelected} 
                  onChange={handleSelectAllCurrent} 
                />
                <span>Вибрати всіх</span>
              </label>

              <button className="history-delete-action-btn" onClick={handleDeleteAction}>
                {selectedIds.length > 0 ? `Видалити вибрані (${selectedIds.length})` : "Видалити всіх"}
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(p => p - 1)}
                className="pag-btn"
              >
                Назад
              </button>
              <span className="page-info">Сторінка {currentPage} з {totalPages}</span>
              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(p => p + 1)}
                className="pag-btn"
              >
                Вперед
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}