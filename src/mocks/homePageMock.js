export const navSections = [
  { href: "#home", label: "Головна" },
  { href: "#about", label: "Про нас" }
];

export const categories = [
  {
    id: "food",
    name: "Їжа",
    children: [
      { id: "bakery", name: "Свіжа випічка" },
      { id: "snacks", name: "Сезонні закуски" }
    ]
  },
  {
    id: "drinks",
    name: "Напої",
    children: [
      { id: "lemonades", name: "Лимонади" },
      { id: "coffee", name: "Холодна кава" }
    ]
  },
  {
    id: "clothes",
    name: "Одяг",
    children: [
      { id: "aprons", name: "Фартухи" },
      { id: "linen", name: "Лляний текстиль" }
    ]
  }
];

export const banner = {
  imageUrl:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  imageAlt: "Банер магазину"
};

export const products = [
  {
    id: "pear-tart",
    name: "Грушевий тарт",
    price: 210,
    currency: "грн",
    categoryId: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80",
    description: "Ніжний тарт із соковитою грушею."
  },
  {
    id: "green-lemonade",
    name: "Зелений лимонад",
    price: 95,
    currency: "грн",
    categoryId: "drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    description: "Освіжаючий лимонад з лаймом та м'ятою."
  },
  {
    id: "linen-apron",
    name: "Лляний фартух",
    price: 680,
    currency: "грн",
    categoryId: "clothes",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description: "Лляний фартух для кухні та щоденного використання."
  },
  {
    id: "herb-bundle",
    name: "Букет пряних трав",
    price: 140,
    currency: "грн",
    categoryId: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=900&q=80",
    description: "Свіжий набір ароматних трав для кухні."
  },
  {
    id: "cold-brew",
    name: "Cold brew у пляшці",
    price: 120,
    currency: "грн",
    categoryId: "drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    description: "Холодна кава у пляшці для швидкого перекусу."
  },
  {
    id: "picnic-blanket",
    name: "Плед для пікніка",
    price: 890,
    currency: "грн",
    categoryId: "clothes",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    description: "Щільний плед для дому, тераси або пікніка."
  }
];
