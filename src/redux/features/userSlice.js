import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../../services/users/requests";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  users: storedUser || null,
  balance: storedUser?.balance || 0,
};

export const initUser = createAsyncThunk(
  "users/initUser",
  async () => {
    const userId = JSON.parse(localStorage.getItem("userId"));

    if (!userId) return null;

    const response = await getUserById(userId);
    const user = response.data;

    if (user && user.id) {
      const safeUser = { ...user };
      delete safeUser.password;

      return safeUser;
    }

    return null;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action) {
      state.users = action.payload;
      state.balance = action.payload?.balance || 0;
      localStorage.setItem("userId", JSON.stringify(action.payload?.id));
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    updateBalance(state, action) {
      if (state.users) {
        state.users.balance = action.payload;
        state.balance = action.payload;
      }
    },

    updateProfile(state, action) {
      if (state.users) {
        state.users = { ...state.users, ...action.payload };
      }
    },

    logout(state) {
      state.users = null;
      state.balance = 0;
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload;
        state.balance = action.payload.balance || 0;
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    });
  },
});

export const { login, logout, updateBalance, updateProfile } =
  userSlice.actions;

export default userSlice.reducer;
