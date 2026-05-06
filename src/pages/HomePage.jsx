import { useDeferredValue, useState } from "react";

import { CatalogSidebar } from "../components/home/CatalogSidebar";
import { HeroBanner } from "../components/home/HeroBanner";
import { ProductCard } from "../components/home/ProductCard";
import { banner, categories, products } from "../mocks/homePageMock";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [expandedCategoryIds, setExpandedCategoryIds] = useState(
    categories.map((category) => category.id)
  );

  const normalizedSearch = deferredSearchQuery.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategoryId === "all" || product.categoryId === selectedCategoryId;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [product.name, product.description].some((value) =>
        value.toLowerCase().includes(normalizedSearch)
      );

    return matchesCategory && matchesSearch;
  });

  function toggleCategory(categoryId) {
    setExpandedCategoryIds((currentIds) =>
      currentIds.includes(categoryId)
        ? currentIds.filter((id) => id !== categoryId)
        : [...currentIds, categoryId]
    );
  }

  return (
    <section className="home-page" id="home">
      <CatalogSidebar
        categories={categories}
        searchQuery={searchQuery}
        selectedCategoryId={selectedCategoryId}
        expandedCategoryIds={expandedCategoryIds}
        productCount={visibleProducts.length}
        onSearchChange={setSearchQuery}
        onSelectCategory={setSelectedCategoryId}
        onToggleCategory={toggleCategory}
      />

      <div className="home-page__content">
        <HeroBanner banner={banner} />

        <section className="catalog-panel" id="catalog" aria-labelledby="catalog-title">
          <div className="catalog-panel__header">
            <h2 id="catalog-title">Новинки</h2>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state__title">Нічого не знайдено</p>
              <p>Спробуйте інший пошуковий запит або змініть категорію.</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
