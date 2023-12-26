import { useForm } from 'react-hook-form';
import { createApplication } from '../store/applicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { schema } from '../helpers/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const ApplicationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});
  const dispatch = useDispatch()
  const status = useSelector(state => state.application.status)
  const navigate = useNavigate()

  useEffect(() => {
    if(status === "success"){
       navigate("/basvuru-basarili")
    }
  } , [status, navigate])

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('lastName', data.lastName);
    formData.append('age', data.age);
    formData.append('tc', data.tc);
    formData.append('applicationReason', data.applicationReason);
    formData.append('address', data.address);
  
    formData.append('file', data.file[0]);
  
    dispatch(createApplication(formData))
  };

  return (
    <>
        <div className='background-image'></div>
        <div className='blur-background'> </div>
        <div className='form-container'>
            <div className=' mx-auto  border py-10 px-32 rounded-md z-10 bg-white' >
            <h1 className='mb-5 text-4xl text-slate-700 text-start'>Kullanıcı Formu</h1>

            <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                width: "100%",
                margin : "0 auto",
                flexDirection: 'column',
                '& .MuiTextField-root': { // TextField'lerin genel stilini belirtmek için
                marginBottom: '16px', 
                },
            }}

            >
                <TextField
                    id="outlined-required"
                    label="Ad"
                    variant="outlined"
                    {...register('name', { required: true })}
                    error={!!errors.name}
                    helperText={errors.name && "Name is required"}
                    size="small"
                />
                <TextField
                    id="outlined-required"
                    label="Soyad"
                    variant="outlined"
                    {...register('lastName', { required: true })}
                    error={!!errors.lastName}
                    helperText={errors.lastName && "Surname is required"}
                    size="small"
                />
                <TextField
                    id="outlined-required"
                    label="Yaş"
                    variant="outlined"
                    {...register('age', { required: true })}
                    error={!!errors.age}
                    helperText={errors.age && "Age is required"}
                    size="small"
                />
                <TextField
                    id="outlined-required"
                    label="TC"
                    variant="outlined"
                    {...register('tc', { required: true, minLength: 11, maxLength: 11  })}
                    error={!!errors.tc}
                    helperText={errors.tc && "TR ID number must be 11 digits."}
                    size="small"
                />
                <TextField
                    id="outlined-required"
                    label="Başvuru Nedeni"
                    variant="outlined"
                    {...register('applicationReason', { required: true})}
                    error={!!errors.applicationReason}
                    helperText={errors.applicationReason && "Application reason is required"}
                    size="small"
                />
                <TextField
                    id="outlined-required"
                    label="Adres"
                    variant="outlined"
                    {...register('address', { required: true})}
                    error={!!errors.address}
                    helperText={errors.address && "Address is required"}
                    size="small"
                />


                <Input
                        type="file"
                        id="file-upload"
                        {...register('file', { required: true })}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload">
                            <Button 
                                variant="contained" 
                                component="span" 
                                style={{ backgroundColor: 'gray', color: 'white' }}
                            >
                                Dosya Yükle
                            </Button>
                        </label>
                <button type='submit' className='mt-10 bg-orange-500 text-white' >Submit</button>
            </Box>
            </div>
        </div>
    </>
  );
};

export default ApplicationForm;
