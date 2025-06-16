import { createSlice } from "@reduxjs/toolkit";

import { getAllUsers, getUserById } from "../../services/users/requests";


const savedUsers = localStorage.getItem("users");
const initialUsers = savedUsers ? JSON.parse(savedUsers) : null;


const initialState = {
    users: initialUsers,

};



const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUsers(state, action) {
            state.users = action.payload;
            localStorage.setItem("users", JSON.stringify(action.payload));
        },
        logout(state) {
            state.users = [];
            localStorage.removeItem("users");
        },
    },
},


