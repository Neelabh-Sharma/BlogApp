import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 👉 Set your backend API URL
const BASE_URL = 'https://infoappp.onrender.com'; // Replace with actual backend URL

// 🔹 Get all blogs
export const getAllBlogs = createAsyncThunk(
  'blogs/getAllBlogs', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Get blogs by email
export const getBlogsByEmail = createAsyncThunk(
  'blogs/getBlogsByEmail', 
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Create a new blog
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async ({ email, title, subtitle, imageUrl, content }, { rejectWithValue }) => {
    try {
      // Validate required fields
      if (!email || !title || !subtitle || !content) {
        throw new Error('All fields are required');
      }

      const response = await axios.post(`${BASE_URL}/api/auth/add`, {
        email,
        title,
        subtitle,
        imageUrl,
        content,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔧 Slice
const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    createStatus: 'idle', // separate status for create operations
    createError: null,
  },
  reducers: {
    // Reset create status
    resetCreateStatus: (state) => {
      state.createStatus = 'idle';
      state.createError = null;
    },
    // Clear all errors
    clearErrors: (state) => {
      state.error = null;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL BLOGS
      .addCase(getAllBlogs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // GET BLOGS BY EMAIL
      .addCase(getBlogsByEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getBlogsByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getBlogsByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // CREATE BLOG
      .addCase(createBlog.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.items.push(action.payload); // add new blog to list
        state.createError = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.payload || action.error.message;
      });
  },
});

export const { resetCreateStatus, clearErrors } = blogSlice.actions;
export default blogSlice.reducer;