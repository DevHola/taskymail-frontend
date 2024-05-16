// src/slices/mailSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchMails = createAsyncThunk('mail/fetchMails', async () => {
  const token = Cookies.get('token')

  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    },
    withCredentials: true
};


  const { data } = await axios.get('https://taskymail.onrender.com/api/mymail', config);
  return data.mails;
});

export const updateMailStatus = createAsyncThunk('mail/updateMailStatus', async (mailId) => {
  const token = Cookies.get('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    withCredentials: true
  }

  await axios.put(`https://taskymail.onrender.com/api/status/${mailId}`, { status: true }, config);
  return mailId;
});

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    mails: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.loading = false;
        state.mails = action.payload;
        state.unreadCount = action.payload.filter(mail => !mail.isRead).length;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMailStatus.fulfilled, (state, action) => {
        const mail = state.mails.find(mail => mail._id === action.payload);
        if (mail) {
          mail.isRead = true;
          state.unreadCount -= 1;
        }
      });
  },
});

export default mailSlice.reducer;
