import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
    status: "",
    newApplication : null,
    allApplications: [],
    application : {},
    appCode: "",
}

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        sortApplicationsByNewest: state => {
            state.allApplications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          },
          sortApplicationsByOldest: state => {
            state.allApplications.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          },
          resetStatus: state => {
            state.status = ""
          }
    },
    extraReducers: (builder) => {
        builder.addCase(createApplication.fulfilled, (state, action) => {
            state.status = "success"
            state.newApplication = action.payload
        }),
        builder.addCase(getAllApplications.fulfilled, (state, action) => {
            state.allApplications = action.payload
            state.status = ""
        })
        builder.addCase(getAllApplications.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(getApplication.fulfilled, (state, action) => {
            state.application = action.payload
            state.status = "success"
            state.appCode = action.payload.appCode
        }),
        builder.addCase(getApplication.rejected, (state) => {
            state.status = "error"
        }),
        builder.addCase(updateApplication.fulfilled, (state, action) => {
            state.application = action.payload
            state.status = "updated"
        })
    }
})



export const createApplication = createAsyncThunk('application/createApplication', async(reqData , {rejectWithValue}) => {
    try{
        const res = await fetch(`https://application-app.onrender.com/application`, {
            method: "POST",
            body: reqData
        })
        const data  = await res.json()
    
        if (res.ok) {
            
            return data.data; // Successfully added the review
        } else {
            return rejectWithValue(data); // Forward the error message
        }
    }catch(e){
        console.log(e)
    }
})


export const getAllApplications = createAsyncThunk('application/getAllAplications', async(_ , {rejectWithValue}) => {
    try{
        const res = await fetch(`https://application-app.onrender.com/application`, {
            method: "GET",
            headers: {
                "Authorazition" : `Bearer ${localStorage.getItem("jwt")}`,
                "Content-type" : 'application/json'
            } ,
        })
        const data  = await res.json()
    
        if (res.ok) {
            
            return data.data; // Successfully added the review
        } else {
            return rejectWithValue(data); // Forward the error message
        }
    }catch(e){
        console.log(e)
    }
})

export const getApplication = createAsyncThunk('application/getAplication', async(basvuruNo , {rejectWithValue}) => {
    try{
        const res = await fetch(`https://application-app.onrender.com/application/${basvuruNo}`, {
            method: "GET",
            headers: {
                "Authorazition" : `Bearer ${localStorage.getItem("jwt")}`,
                "Content-type" : 'application/json'
            } ,
        })
        const data  = await res.json()
    
        if (res.ok) {
            
            return data.data; 
        } else {
            return rejectWithValue(data); // Forward the error message
        }
    }catch(e){
       /*  console.log(e) */
    }
})

export const updateApplication = createAsyncThunk('application/updateAplication', async(reqData , {rejectWithValue}) => {
    try{
        const res = await fetch(`https://application-app.onrender.com/application/update`, {
            method: "POST",
            headers: {
                "Authorazition" : `Bearer ${localStorage.getItem("jwt")}`,
                "Content-type" : 'application/json'
            } ,
            body: JSON.stringify(reqData)
        })
        const data  = await res.json()
    
        if (res.ok) {
            
            return data.data; // Successfully added the review
        } else {
            return rejectWithValue(data); // Forward the error message
        }
    }catch(e){
        console.log(e)
    }
})


export const {sortApplicationsByNewest, resetStatus, sortApplicationsByOldest} = applicationSlice.actions

export default applicationSlice.reducer