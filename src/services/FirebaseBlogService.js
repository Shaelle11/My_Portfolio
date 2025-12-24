// Firebase-based Blog Service
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

class FirebaseBlogService {
  constructor() {
    this.collectionName = 'blog_posts';
  }

  // Create a new blog post
  async createPost(postData) {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...postData,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date())
      });
      
      return {
        success: true,
        data: {
          id: docRef.id,
          ...postData
        },
        message: 'Blog post created successfully!'
      };
    } catch (error) {
      console.error('Error creating post:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to create blog post'
      };
    }
  }

  // Get all blog posts
  async getAllPosts() {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        });
      });
      
      return {
        success: true,
        data: posts,
        message: 'Posts retrieved successfully'
      };
    } catch (error) {
      console.error('Error getting posts:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        message: 'Failed to retrieve posts'
      };
    }
  }

  // Get published posts only
  async getPublishedPosts() {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        });
      });
      
      return {
        success: true,
        data: posts,
        message: 'Published posts retrieved successfully'
      };
    } catch (error) {
      console.error('Error getting published posts:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        message: 'Failed to retrieve published posts'
      };
    }
  }

  // Update a blog post
  async updatePost(postId, postData) {
    try {
      const postRef = doc(db, this.collectionName, postId);
      await updateDoc(postRef, {
        ...postData,
        updatedAt: Timestamp.fromDate(new Date())
      });
      
      return {
        success: true,
        message: 'Blog post updated successfully'
      };
    } catch (error) {
      console.error('Error updating post:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to update blog post'
      };
    }
  }

  // Delete a blog post
  async deletePost(postId) {
    try {
      await deleteDoc(doc(db, this.collectionName, postId));
      
      return {
        success: true,
        message: 'Blog post deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting post:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete blog post'
      };
    }
  }

  // Search blog posts
  async searchPosts(keyword) {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts = [];
      const searchTerm = keyword.toLowerCase();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const matchesSearch = 
          data.title?.toLowerCase().includes(searchTerm) ||
          data.content?.toLowerCase().includes(searchTerm) ||
          data.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          data.category?.toLowerCase().includes(searchTerm);
        
        if (matchesSearch) {
          posts.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date()
          });
        }
      });
      
      return {
        success: true,
        data: posts,
        message: 'Search completed successfully'
      };
    } catch (error) {
      console.error('Error searching posts:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        message: 'Search failed'
      };
    }
  }

  // Get posts by category
  async getPostsByCategory(category) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        });
      });
      
      return {
        success: true,
        data: posts,
        message: `Posts in ${category} category retrieved successfully`
      };
    } catch (error) {
      console.error('Error getting posts by category:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        message: 'Failed to retrieve posts by category'
      };
    }
  }
}

// Create and export instance
const firebaseBlogService = new FirebaseBlogService();
export { firebaseBlogService };
export default firebaseBlogService;