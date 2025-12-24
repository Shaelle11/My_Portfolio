// Simple local storage service for contact messages
class ContactService {
  constructor() {
    this.storageKey = 'portfolio_contact_messages';
  }

  // Save a new message
  async saveMessage(messageData) {
    try {
      const messages = this.getAllMessagesSync();
      const newMessage = {
        id: Date.now().toString(),
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false,
        ip: this.getClientIP(),
      };
      
      messages.unshift(newMessage); // Add to beginning of array
      localStorage.setItem(this.storageKey, JSON.stringify(messages));
      return { success: true, messageId: newMessage.id };
    } catch (error) {
      console.error('Error saving message:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all messages
  async getAllMessages() {
    try {
      const messages = localStorage.getItem(this.storageKey);
      const messageList = messages ? JSON.parse(messages) : [];
      return {
        success: true,
        data: messageList,
        message: 'Messages retrieved successfully'
      };
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        message: 'Failed to retrieve messages'
      };
    }
  }

  // Mark message as read
  async markAsRead(messageId) {
    try {
      const messages = this.getAllMessagesSync();
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        messages[messageIndex].read = true;
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
        return { success: true, message: 'Message marked as read' };
      }
      return { success: false, message: 'Message not found' };
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete a message
  async deleteMessage(messageId) {
    try {
      const messages = this.getAllMessagesSync();
      const filteredMessages = messages.filter(msg => msg.id !== messageId);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredMessages));
      return { success: true, message: 'Message deleted successfully' };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { success: false, error: error.message };
    }
  }

  // Synchronous version for internal use
  getAllMessagesSync() {
    try {
      const messages = localStorage.getItem(this.storageKey);
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return [];
    }
  }

  // Get unread count
  async getUnreadCount() {
    try {
      const messages = this.getAllMessagesSync();
      const unreadCount = messages.filter(msg => !msg.read).length;
      return {
        success: true,
        data: unreadCount,
        message: 'Unread count retrieved successfully'
      };
    } catch (error) {
      console.error('Error getting unread count:', error);
      return {
        success: false,
        error: error.message,
        data: 0,
        message: 'Failed to get unread count'
      };
    }
  }

  // Simple client IP detection (limited in browser)
  getClientIP() {
    return 'Browser-Client'; // Placeholder - real IP detection requires server
  }

  // Export messages as JSON
  exportMessages() {
    const messages = this.getAllMessages();
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `contact_messages_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }
}

export default new ContactService();