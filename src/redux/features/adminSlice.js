import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../../services/users/requests";


const adminId = localStorage.getItem("adminId");

  const initialState = { admin: null };


if (JSON.parse(adminId)) {

const response = await getUserById(adminId);

const admin = response.data;


  if (admin?.id) {
    delete admin.password;
    initialState.admin = { ...admin };
  }} else {
  localStorage.setItem("adminId", JSON.stringify(null));
}


const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.admin = { ...action.payload };
    },
    updateProfile(state, action) {
      state.admin = { ...state.admin, ...action.payload };
    },
    logout(state) {
      state.admin = null;
    },
  },
});

export const { login, logout, updateProfile } = adminSlice.actions;
export default adminSlice.reducer;
