import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function ApplicationSuccess() {
    const application = useSelector(state => state.application.newApplication)

    return (
        <div className="w-1/2 mx-auto mt-20">
            <div className="rounded-lg text-start bg-emerald-50 py-52 px-24">
                <h1 className="text-center">Teşekkürler!</h1>
                <p className="mt-5 ">Form başarıyla gönderildi. Bize zaman ayırdığınız için teşekkür ederiz.</p>
                <p >Başvurunuzun durumu bu kod ile takip edebilirsiniz: <span className="font-bold">{application && application.appCode}</span> </p>
                <Link className="text-black me-auto mt-10" to="/basvuru-sorgula">Başvuru Sorgulama Ekranı</Link>
            </div>
        </div>
    )
}

export default ApplicationSuccess
