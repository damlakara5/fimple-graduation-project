import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getApplication, resetStatus, updateApplication } from "../store/applicationSlice"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AppplicationInfo from "../components/AppplicationInfo";
import ErrorPage from "./ErrorPage";

function ApplicationDetails() {
    const {basvuruNo} = useParams()
    const dispatch = useDispatch()
    const { application,status: errorStatus} = useSelector(state => state.application)
    const [status, setStatus] = useState('');
    const [answer, setAnswer] = useState('');
    const [showToast, setShowToast] = useState(false)

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
};

    useEffect(() => {
        dispatch(getApplication(basvuruNo))
    } , [basvuruNo, dispatch])



    const handleUpdate = () => {
        dispatch(updateApplication({
            status,
            appCode: basvuruNo,
            answer
        }))
        setAnswer("")
    }

    useEffect(() => {
        if (errorStatus === 'updated') {
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false)
                dispatch(resetStatus())
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorStatus,dispatch]);

    if(errorStatus === "error") return <ErrorPage />




    return (
        <div className="grid md:grid-cols-2 gap-5 relative ">
         {showToast && <div className="absolute top-0 rounded-md right-5 bg-green-500 px-10 py-1 text-white"> Başvuru başarıyla güncellendi. </div>}
          <div className="border shadow-md rounded-md ms-10 py-10">
          <AppplicationInfo />
           {
                application.answers  && application.answers.length !== 0 && (
                    <div className="text-start ps-20 mt-20">
                        <p className="font-bold text-xl mb-10">Cevaplar</p>
                        {application.answers.map(answer => <div key={answer._id}>
                            <p  >{answer.user.user} <span className="text-slate-500 ms-6"> {answer.createdAt}</span> </p>
                            <p className="ps-10" >{answer.answer}</p>
                        </div>)}
                    </div>
                )
            }
          </div>
           <div className="flex flex-col p-20 gap-6 me-10 md:mt-0 mt-10 border shadow-md rounded-md">
               <>          
                {
                    application.status !== "çözüldü" &&  
                    <>
                        <p className="text-start ">Change the status</p>
                        <FormControl variant="standard" sx={{  minWidth: 120, maxWidth: 300 }}>
                            <InputLabel id="demo-simple-select-standard-label"> {application.status} </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={status}
                                onChange={handleChange}
                                label="Age"
                            >
                                <MenuItem value={"çözüldü"}>Çözüldü</MenuItem>
                                <MenuItem value={"iptal"}>İptal Edildi</MenuItem>
                                <MenuItem value={"bekliyor"}>Bekliyor</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                   
                }
               </>
                <div className="me-auto">
                    <p className="text-start mb-3 ">Write an answer</p>
                    <TextField
                        id="outlined-multiline-static"
                        label="Cevap"
                        multiline
                        rows={4}
                        value={answer}
                        onChange={handleAnswerChange}
                    />
                </div>
                <button onClick={handleUpdate} className="bg-orange-500 text-white max-w-max mx-auto">Gönder</button>
           </div>
        </div>
    )
}

export default ApplicationDetails
