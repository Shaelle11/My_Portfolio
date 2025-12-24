// Firebase-based Contact Service
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

class FirebaseContactService {
  constructor() {
    this.collectionName = 'contacts';
  }

  // Save a new contact message to Firestore
  async saveMessage(messageData) {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...messageData,
        read: false,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date())
      });
      
      return {
        success: true,
        data: {
          id: docRef.id,
          ...messageData
        },
        message: 'Message sent successfully!'
      };
    } catch (error) {
      console.error('Error saving message:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send message. Please try again.'
      };
    }
  }

  // Get all contact messages from Firestore
  async getAllMessages() {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const messages = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        });
      });
      
      return {
        success: true,
        data: messages,
        message: 'Messages retrieved successfully'
      };
    } catch (error) {
      console.error('Error getting messages:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        message: 'Failed to retrieve messages'
      };
    }
  }

  // Mark a message as read
  async markAsRead(messageId) {
    try {
      const messageRef = doc(db, this.collectionName, messageId);
      await updateDoc(messageRef, {
        read: true,
        updatedAt: Timestamp.fromDate(new Date())
      });
      
      return {
        success: true,
        message: 'Message marked as read'
      };
    } catch (error) {
      console.error('Error marking message as read:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to mark message as read'
      };
    }
  }

  // Delete a message
  async deleteMessage(messageId) {
    try {
      await deleteDoc(doc(db, this.collectionName, messageId));
      
      return {
        success: true,
        message: 'Message deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting message:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete message'
      };
    }
  }

  // Get unread messages count
  async getUnreadCount() {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('read', '==', false)
      );
      
      const querySnapshot = await getDocs(q);
      return {
        success: true,
        data: querySnapshot.size,
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

  // Search messages by keyword
  async searchMessages(keyword) {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const messages = [];
      const searchTerm = keyword.toLowerCase();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const matchesSearch = 
          data.name?.toLowerCase().includes(searchTerm) ||
          data.email?.toLowerCase().includes(searchTerm) ||
          data.subject?.toLowerCase().includes(searchTerm) ||
          data.message?.toLowerCase().includes(searchTerm);
        
        if (matchesSearch) {
          messages.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date()
          });
        }
      });
      
      return {
        success: true,
        data: messages,
        message: 'Search completed successfully'
      };
    } catch (error) {
      console.error('Error searching messages:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        message: 'Search failed'
      };
    }
  }
}

// Create a single instance to export
const firebaseContactService = new FirebaseContactService();

// Keep the original LocalStorage service as fallback
class LocalStorageContactService {
  constructor() {
    this.storageKey = 'portfolio_contacts';
  }

  saveMessage(messageData) {
    try {
      const messages = this.getAllMessages();
      const newMessage = {
        id: Date.now().toString(),
        ...messageData,
        createdAt: new Date().toISOString(),
        read: false
      };
      
      messages.push(newMessage);
      localStorage.setItem(this.storageKey, JSON.stringify(messages));
      
      return {
        success: true,
        data: newMessage,
        message: 'Message saved successfully'
      };
    } catch (error) {
      console.error('Error saving message:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to save message'
      };
    }
  }

  getAllMessages() {
    try {
      const messages = localStorage.getItem(this.storageKey);
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  markAsRead(messageId) {
    try {
      const messages = this.getAllMessages();
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

  deleteMessage(messageId) {
    try {
      const messages = this.getAllMessages();
      const filteredMessages = messages.filter(msg => msg.id !== messageId);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredMessages));
      return { success: true, message: 'Message deleted successfully' };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export both services - you can switch between them
export const ContactService = firebaseContactService;
export const LocalContactService = new LocalStorageContactService();
export default ContactService;