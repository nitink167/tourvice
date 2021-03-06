import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api"

export const login = createAsyncThunk("auth/login", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.signIn(formValue);
        toast.success("Login Succesfully");
        navigate("/");
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const register = createAsyncThunk("auth/register", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.signUp(formValue);
        toast.success("Registered Succesfully");
        navigate("/");
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            localStorage.removeItem("profile")
            state.user = null
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message
        },
        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message
        }
    }
})

export const {setUser, setLogout} = authSlice.actions

export default authSlice.reducer;