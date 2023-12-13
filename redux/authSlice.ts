// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  message: string;
  token: string;
  username:string;
}

interface AuthState {
  isAuthenticated: boolean;
  dataLogin: UserData | null;
}

// Retrieve auth state from local storage or use the default state
const storedAuthState = localStorage.getItem('auth');
const initialState: AuthState = storedAuthState
  ? JSON.parse(storedAuthState)
  : {
      isAuthenticated: false,
      dataLogin: null,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.dataLogin = action.payload;

      // Save authentication information to localStorage
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.dataLogin = null;

      // Clear authentication information from localStorage
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
