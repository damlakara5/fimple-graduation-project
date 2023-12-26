import { useDispatch, useSelector } from "react-redux"
import AppplicationInfo from "../components/AppplicationInfo"
import { useEffect } from "react"
import { getApplication } from "../store/applicationSlice"
import { useParams } from "react-router-dom"
import ErrorPage from "./ErrorPage"

function UserApplicationDetails() {
    const {basvuruNo} = useParams()
    const {application, status} = useSelector(state => state.application)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApplication(basvuruNo))
    } , [basvuruNo, dispatch])


    if(status === "error") return <ErrorPage />

    return (
        <div className="grid grid-cols-2 pt-10">
            <div className="border shadow-md rounded-md ms-10 py-10">
                <AppplicationInfo  />
            </div>
            {
                application.answers && application.answers.length !== 0 && (
                    <div className="text-start">
                        <p className="font-bold text-xl mb-10">Cevaplarınız</p>
                        {application.answers.map(answer => <div key={answer._id}>
                            <p  >{answer.user.user} <span className="text-slate-500 ms-6"> {answer.createdAt}</span> </p>
                            <p className="ps-10" >{answer.answer}</p>
                        </div>)}
                    </div>
                )
            }

        </div>
    )
}

export default UserApplicationDetails
