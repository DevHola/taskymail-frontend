import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const login = createAsyncThunk('auth/login', async (inputValue, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('https://taskymail.onrender.com/api/login', inputValue, { withCredentials: true });
    if (data.success) {
      Cookies.set('token', data.token, { path: '/', expires: 60 * 60 , secure: true, sameSite: 'None'});
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const register = createAsyncThunk('auth/register', async (inputValue, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('https://taskymail.onrender.com/api/register', inputValue, { withCredentials: true });
    if (data.success) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const token = Cookies.get('token');

  const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
      },
      withCredentials: true
  };

  const { data } = await axios.post('https://taskymail.onrender.com/api', {}, config);
  return data.user;
});

  export const logout = createAsyncThunk('auth/logout', async () => {
    try {
     Cookies.remove('token')
    } catch (error) {
      console.error('Error logging out:', error);
    }
  });
  
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: { },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null; // Clear the user state
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});
export default authSlice.reducer;
