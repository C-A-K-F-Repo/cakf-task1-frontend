const Order = require('./Order');

describe('Order Model', () => {
    test('should format system date to DD.MM.YYYY', () => {
        const testOrder = new Order("1", "user123", "food", 5, "2026-03-14T10:30:00");
        expect(testOrder.getFormattedDate()).toBe("14.03.2026");
    });

    test('should throw an error when quantity is negative or zero', () => {
        const invalidOrder = new Order("2", "user123", "food", -5, "2026-03-14");
        expect(() => {
            invalidOrder.validateQuantity();
        }).toThrow();
    });
});