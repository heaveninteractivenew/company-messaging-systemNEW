const { sendMessage, receiveMessage } = require('../../src/messages');

describe('Message Handling Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Send Message', () => {
    test('should successfully send a message', async () => {
      const mockMessage = {
        to: 'recipient',
        content: 'Hello, test message',
        timestamp: new Date()
      };

      const result = await sendMessage(mockMessage);
      expect(result.success).toBe(true);
      expect(result.messageId).toBeDefined();
    });

    test('should handle empty message content', async () => {
      const mockMessage = {
        to: 'recipient',
        content: '',
        timestamp: new Date()
      };

      const result = await sendMessage(mockMessage);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Message content cannot be empty');
    });

    test('should handle invalid recipient', async () => {
      const mockMessage = {
        to: '',
        content: 'Hello, test message',
        timestamp: new Date()
      };

      const result = await sendMessage(mockMessage);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid recipient');
    });
  });

  describe('Receive Message', () => {
    test('should successfully receive messages', async () => {
      const messages = await receiveMessage();
      expect(Array.isArray(messages)).toBe(true);
      expect(messages[0]).toHaveProperty('content');
      expect(messages[0]).toHaveProperty('from');
      expect(messages[0]).toHaveProperty('timestamp');
    });

    test('should handle no new messages', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({ messages: [] });
      
      const messages = await receiveMessage();
      expect(Array.isArray(messages)).toBe(true);
      expect(messages.length).toBe(0);
    });
  });
});
