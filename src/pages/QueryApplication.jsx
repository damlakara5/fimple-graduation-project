import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApplication } from '../store/applicationSlice';

function QueryApplication() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {status, appCode} = useSelector(state => state.application)


    const onSubmit =(data) => {
        dispatch(getApplication(data.appCode))
    }

    useEffect(() => {
        if(status === "success"){
            navigate(`/basvuru/${appCode}`) 
        }
    } , [status,navigate, appCode])

    return (
        <>
        <div className='background-image'></div>
        <div className='blur-background'> </div>
    
        <div className='form-container'>
            <div className=' mx-auto mt-20 py-10 px-16 border rounded-md bg-white z-10' >
                <p className='text-start font-bold text-xl mb-10'>Başvuru Numaranızı Giriniz</p>
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
                    label="Başvuru Numarası"
                    variant="outlined"
                    {...register('appCode', { required: true,minLength: 6, maxLength: 6  })}
                    error={!!errors.appCode}
                    helperText={errors.appCode && "App Code is required and must be 6 digit"}
                    size="small"
                />
            <button type='submit' className='mt-10 max-w-max mx-auto bg-orange-500 text-white' >Sorgula</button>
            </Box>
            {status === "error" && <p className='bg-red-200 mt-5 text-red-700'> Başvuru bulunamadı! </p>}
            </div>
        </div>
    </>
    )
}

export default QueryApplication
