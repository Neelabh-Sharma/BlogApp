import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 👉 Set your backend API URL
const BASE_URL = 'https://infoappp.onrender.com'; // Replace with actual backend URL

// 🔹 Get all blogs
export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async () => {
  const response = await axios.get(`${BASE_URL}/api/auth`);
  return response.data;
});

// 🔹 Get blogs by email
export const getBlogsByEmail = createAsyncThunk('blogs/getBlogsByEmail', async ({ email }) => {
  const response = await axios.get(`${BASE_URL}/api/auth/${email}`);
  return response.data;
});

// 🔹 Create a new blog
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async ({ email, title, subtitle, imageUrl, content }) => {
    const response = await axios.post(`${BASE_URL}/api/auth/add`, {
      email,
      title,
      subtitle,
      imageUrl,
      content,
    });
    return response.data;
  }
);

// 🔧 Slice
const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL BLOGS
      .addCase(getAllBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // GET BLOGS BY EMAIL
      .addCase(getBlogsByEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBlogsByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getBlogsByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // CREATE BLOG
      .addCase(createBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); // add new blog to list
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
