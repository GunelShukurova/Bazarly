import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../../services/users/requests";

const storedAdmin = JSON.parse(localStorage.getItem("admin"));

export const initAdmin = createAsyncThunk(
  "admin/initAdmin",
  async () => {
    const adminId = JSON.parse(localStorage.getItem("adminId"));

    if (!adminId) return null;

    const response = await getUserById(adminId);
    const admin = response.data;

    if (admin?.id) {
      const safeAdmin = { ...admin };
      delete safeAdmin.password;
      return safeAdmin;
    }

    return null;
  }
);


const initialState = {
  admin: storedAdmin || null,
};


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login(state, action) {
      const safeAdmin = action.payload ? { ...action.payload } : null;
      if (safeAdmin) {
        delete safeAdmin.password;
      }
      state.admin = safeAdmin;
      localStorage.setItem(
        "adminId",
        JSON.stringify(safeAdmin?.id ?? null)
      );
      if (safeAdmin) {
        localStorage.setItem("admin", JSON.stringify(safeAdmin));
      } else {
        localStorage.removeItem("admin");
      }
    },

    updateProfile(state, action) {
      if (state.admin) {
        state.admin = { ...state.admin, ...action.payload };
      }
    },

    logout(state) {
      state.admin = null;
      localStorage.setItem("adminId", JSON.stringify(null));
      localStorage.removeItem("admin");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initAdmin.fulfilled, (state, action) => {
      state.admin = action.payload;
      if (action.payload) {
        localStorage.setItem("admin", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("admin");
      }
    });
  },
});

export const { login, logout, updateProfile } = adminSlice.actions;
export default adminSlice.reducer;
