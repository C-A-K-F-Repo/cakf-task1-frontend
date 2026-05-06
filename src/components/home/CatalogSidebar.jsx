export function CatalogSidebar({
  categories,
  searchQuery,
  selectedCategoryId,
  expandedCategoryIds,
  productCount,
  onSearchChange,
  onSelectCategory,
  onToggleCategory
}) {
  return (
    <aside className="catalog-sidebar" aria-label="Фільтри каталогу">
      <div className="catalog-sidebar__section">
        <div className="catalog-sidebar__header-row">
          <h2>Знайти товари</h2>
          <div className="catalog-sidebar__search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M10.5 4a6.5 6.5 0 1 1 0 13a6.5 6.5 0 0 1 0-13Zm0 2a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9Zm6.15 9.24 3.06 3.05-1.41 1.42-3.06-3.06 1.41-1.41Z" />
            </svg>
          </div>
        </div>

        <label className="catalog-sidebar__search">
          <span className="sr-only">Пошук товарів</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Назва або опис"
          />
        </label>
      </div>

      <div className="catalog-sidebar__section">
        <div className="catalog-sidebar__header-row catalog-sidebar__header-row--compact">
          <h3>Категорії</h3>
          <span className="catalog-sidebar__count">{productCount}</span>
        </div>

        <button
          type="button"
          className={
            selectedCategoryId === "all"
              ? "category-row category-row--active"
              : "category-row"
          }
          onClick={() => onSelectCategory("all")}
        >
          <span className="category-row__caret">#</span>
          <span>Усі товари</span>
        </button>

        <div className="category-list">
          {categories.map((category) => {
            const isExpanded = expandedCategoryIds.includes(category.id);
            const isActive = selectedCategoryId === category.id;

            return (
              <div key={category.id} className="category-group">
                <div className="category-group__row">
                  <button
                    type="button"
                    className={isActive ? "category-row category-row--active" : "category-row"}
                    onClick={() => onSelectCategory(category.id)}
                  >
                    <span className="category-row__caret">{isExpanded ? "v" : ">"}</span>
                    <span>{category.name}</span>
                  </button>

                  <button
                    type="button"
                    className="category-group__toggle"
                    onClick={() => onToggleCategory(category.id)}
                    aria-label={isExpanded ? "Згорнути категорію" : "Розгорнути категорію"}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? "-" : "+"}
                  </button>
                </div>

                {isExpanded && category.children.length > 0 && (
                  <div className="category-children" aria-label={`${category.name} підкатегорії`}>
                    {category.children.map((child) => (
                      <span key={child.id} className="category-chip">
                        {child.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
