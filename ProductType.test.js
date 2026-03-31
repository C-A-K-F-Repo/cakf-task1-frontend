const ProductType = require('./ProductType');

describe('ProductType Model', () => {
    test('should return correct category details', () => {
        const drinkType = new ProductType("1", "drinks", "Beverages category");
        expect(drinkType.getDetails()).toBe("Category: drinks - Beverages category");
    });

    test('should return false if product type is not available', () => {
        const clothesType = new ProductType("2", "clothes", "Clothing", false);
        expect(clothesType.isAvailable()).toBe(false);
    });
});