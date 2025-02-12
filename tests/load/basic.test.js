const axios = require('axios');

describe('Basic Load Testing', () => {
  const BASE_URL = 'http://localhost:8000';
  const NUM_REQUESTS = 100;
  const CONCURRENT_USERS = 10;

  test('should handle multiple message sends', async () => {
    const requests = [];
    for (let i = 0; i < NUM_REQUESTS; i++) {
      requests.push(
        axios.post(`${BASE_URL}/api/messages`, {
          to: 'testuser',
          content: `Test message ${i}`,
          timestamp: new Date()
        })
      );
    }

    const startTime = Date.now();
    const results = await Promise.all(requests);
    const endTime = Date.now();

    const successfulRequests = results.filter(r => r.status === 200).length;
    const avgResponseTime = (endTime - startTime) / NUM_REQUESTS;

    expect(successfulRequests).toBe(NUM_REQUESTS);
    expect(avgResponseTime).toBeLessThan(1000); // Less than 1 second average
  });

  test('should handle concurrent user sessions', async () => {
    const userSessions = [];
    for (let i = 0; i < CONCURRENT_USERS; i++) {
      userSessions.push(
        axios.post(`${BASE_URL}/api/auth/login`, {
          username: `user${i}`,
          password: 'testpassword'
        })
      );
    }

    const results = await Promise.all(userSessions);
    const successfulLogins = results.filter(r => r.status === 200).length;

    expect(successfulLogins).toBe(CONCURRENT_USERS);
  });
});
