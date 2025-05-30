// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL
const API_BASE_URL = 'https://infoappp.onrender.com/api/auth';

// Async thunk for signup
export const signup = createAsyncThunk('user/signup', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Signup failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for login
export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: credentials.email,
      password: credentials.password,
      remember: credentials.remember
    });

    // Fixed: Store token in localStorage immediately
    if (response.data.token) { // Changed from response.token to response.data.token
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for logout (if your API requires server-side logout)
export const logoutAsync = createAsyncThunk('user/logoutAsync', async (_, thunkAPI) => {
  try {
    // If your API has a logout endpoint
    await axios.post(`${API_BASE_URL}/logout`);
    return true;
  } catch (error) {
    // Even if server logout fails, we'll still logout locally
    console.warn('Server logout failed:', error.message);
    return true;
  }
});

// Helper function to safely parse JSON from localStorage
const parseStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    localStorage.removeItem('user'); // Remove corrupted data
    return null;
  }
};

// Load user from localStorage if exists
const storedUser = parseStoredUser();
const initialState = {
  user: storedUser,
  isLoggedIn: !!storedUser,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Clear any errors
    clearError(state) {
      state.error = null;
    },
    // Reset status to idle
    resetStatus(state) {
      state.status = 'idle';
    },
    // Local logout (immediate)
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.status = 'idle';
      state.error = null;
      localStorage.removeUser('user');
      localStorage.removeItem('token'); // Remove token if stored separately
    },
    // Update user profile (for profile updates)
    updateUserProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user || action.payload;
        state.isLoggedIn = true;
        state.error = null;
        
        // Store user data and token if provided
        localStorage.setItem('user', JSON.stringify(state.user));
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.user = null;
        state.isLoggedIn = false;
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user || action.payload;
        state.isLoggedIn = true;
        state.error = null;
        
        // Store user data and token if provided
        localStorage.setItem('user', JSON.stringify(state.user));
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.user = null;
        state.isLoggedIn = false;
      })
      
      // Async logout cases
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.status = 'idle';
        state.error = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      })
      .addCase(logoutAsync.rejected, (state) => {
        // Even if server logout fails, logout locally
        state.user = null;
        state.isLoggedIn = false;
        state.status = 'idle';
        state.error = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      });
  }
});

// Export actions
export const { logout, clearError, resetStatus, updateUserProfile } = userSlice.actions;

// Export selectors
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectIsLoading = (state) => state.user.status === 'loading';

// Export reducer
export default userSlice.reducer;