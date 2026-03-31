const AuthService = require('./AuthService');

describe('AuthService', () => {
    test('should return false if user is not authenticated', () => {
      
        const authService = new AuthService(null, null); 
        expect(authService.isAuthenticated()).toBe(false);
    });

    test('should return true if user has a valid token', () => {
       
        const authService = new AuthService("valid_jwt_token_123", "CUSTOMER");
        expect(authService.isAuthenticated()).toBe(true);
    });
});