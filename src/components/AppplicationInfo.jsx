import { useSelector } from "react-redux";
import { formatDate } from "../helpers/dateFormatter";
import PropTypes from "prop-types"

function AppplicationInfo({className}) {
    const application = useSelector(state => state.application.application)

    return (
        <div className={`text-start ps-20 ${className} `}>
            <p className="font-bold text-xl mb-10">Application Details</p>
            <div className="flex items-center gap-3 justify-between w-1/3 mb-1"> <span className="font-semibold">Ad:</span> <p> {application.name} {application.lastName} </p></div>
            <div className="flex items-center gap-3 justify-between w-1/3 mb-1"> <span className="font-semibold">Soyad:</span> <p> {application.age} </p></div>
            <div className="flex items-center gap-3 justify-between w-1/3 mb-1"> <span className="font-semibold">TC:</span> <p> {application.tc} </p></div>
            <div className="flex items-center gap-3 justify-between w-1/3 mb-1"> <span className="font-semibold">Başvuru Nedeni:</span> <p>  {application.applicationReason} </p></div>
            <div className="flex items-center gap-3 justify-between w-1/3 mb-1"> <span className="font-semibold">Başvuru Tarihi:</span> <p>  {formatDate(application.createdAt)}  </p></div>
            {application.file && (
                        <img src={`https://application-app.onrender.com/${application.file.path}`} alt={application.file.originalname} />
                    )}
            <>
                <p className="font-bold text-xl mt-20">Başvuru Durumunuz</p>
                {
                    application.statusHistory?.map(item => (
                        <div key={item._id} className="flex gap-3 " > 
                            <p className="font-semibold uppercase">{item.status}</p>
                            {item.updatedBy?.user && <p> Updated by {item.updatedBy?.user} at <span className="text-slate-500"> {formatDate(item.updatedDate)} </span> </p>
                            }
                        </div>
                    ))
                }
            </>
            
    </div>
    )
}

AppplicationInfo.propTypes = {
    className: PropTypes.string
}

export default AppplicationInfo
