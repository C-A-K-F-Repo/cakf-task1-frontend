const User = require('./User');

describe('User Model', () => {
    test('should return true if user is 18 or older', () => {
        const adultUser = new User("1", "John Doe", "john@example.com", "1234567890", "Kyiv", "2000-01-01", "CUSTOMER");
        expect(adultUser.isAdult()).toBe(true);
    });

    test('should return false if user is under 18', () => {
        const childUser = new User("2", "Jane Doe", "jane@example.com", "0987654321", "Lviv", "2015-05-10", "CUSTOMER");
        expect(childUser.isAdult()).toBe(false);
    });

    test('should return formatted profile summary', () => {
        const user = new User("3", "Test User", "test@example.com", "0501112233", "Odesa", "1995-10-10", "CUSTOMER");
        expect(user.getProfileSummary()).toBe("Test User, delivery address: Odesa");
    });

    test('should throw an error if required registration data is empty', () => {
       
        const invalidUser = new User("4", "", "", "", "Kyiv", "2000-01-01", "CUSTOMER");
        
        expect(() => {
            invalidUser.validateRegistrationData(); 
        }).toThrow("Required fields cannot be empty");
    });
});