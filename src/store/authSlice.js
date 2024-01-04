import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



const initialState = {
    status: "",
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem("jwt")
            window.location.href = '/admin';
            state.user = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            console.log("login", action.payload)
            state.status = "loggedIn"
            localStorage.setItem("jwt", action.payload.token)
            state.user= action.payload.data.user
        })
    }
})


export const adminLogin = createAsyncThunk('auth/adminLogin' , async(reqData, {rejectWithValue}) => {
    try{
        const res = await fetch(`https://application-app.onrender.com/admin`, {
            method: "POST",
            headers: {
                "Content-type" : 'application/json'
            },
            body: JSON.stringify(reqData)
        })
        const data  = await res.json()
    
        if (res.ok) {
            
            return data; // Successfully added the review
        } else {
            return rejectWithValue(data); // Forward the error message
        }
    }catch(e) {
        console.log(e)
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions