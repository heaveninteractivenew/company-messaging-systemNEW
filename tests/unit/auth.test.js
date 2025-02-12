const { login, logout } = require('../../src/auth');

describe('Authentication Tests', () => {
  beforeEach(() => {
    // Clear any mocked data
    jest.clearAllMocks();
  });

  describe('Login', () => {
    test('should successfully login with valid credentials', async () => {
      const mockCredentials = {
        username: 'testuser',
        password: 'validpassword'
      };
      
      const result = await login(mockCredentials);
      expect(result.success).toBe(true);
      expect(result.token).toBeDefined();
    });

    test('should fail login with invalid credentials', async () => {
      const mockCredentials = {
        username: 'testuser',
        password: 'wrongpassword'
      };
      
      const result = await login(mockCredentials);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });

    test('should handle network errors during login', async () => {
      // Simulate network error
      jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
      
      const mockCredentials = {
        username: 'testuser',
        password: 'validpassword'
      };
      
      const result = await login(mockCredentials);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('Logout', () => {
    test('should successfully logout user', async () => {
      const result = await logout();
      expect(result.success).toBe(true);
    });

    test('should handle errors during logout', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Logout failed'));
      
      const result = await logout();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Logout failed');
    });
  });
});
