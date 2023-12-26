import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../store/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const status = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    const onSubmit =(data) => {
        dispatch(adminLogin(data))
    }

    useEffect(() => {
        if(status === "loggedIn"){
            navigate("/admin/basvuru-listesi")
        }
    } , [status,navigate])

    return (
        <>
            <div className='background-image'></div>
            <div className='blur-background'> </div>
        
            <div className='form-container'>
                <div className=' mx-auto mt-20 py-10 px-16 border rounded-md bg-white z-10' >
                    <p className='text-start font-bold text-xl mb-10'>Login to Admin Panel</p>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& .MuiTextField-root': { // TextField'lerin genel stilini belirtmek için
                            marginBottom: '16px', // TextField'ler arasına 16px boşluk ekler
                            },
                        }}

                >
                    <TextField
                        id="outlined-required"
                        label="User Name"
                        variant="outlined"
                        {...register('user', { required: true })}
                        error={!!errors.user}
                        helperText={errors.user && "User Name is required"}
                        size="small"
                    />
                    <TextField
                        id="outlined-required"
                        label="Password"
                        variant="outlined"
                        {...register('password', { required: true })}
                        error={!!errors.password}
                        helperText={errors.password && "Password is required"}
                        size="small"
                    />

                <button type='submit' className='mt-10 max-w-max mx-auto bg-orange-500 text-white' >Login</button>
                </Box>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
