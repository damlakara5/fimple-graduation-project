import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import { Link } from "react-router-dom"

function Header() {

    const dispatch = useDispatch()

    return (
        <div className="shadow-md mb-10 flex justify-end px-5 items-center gap-8">
            <Link to="/admin/basvuru-listesi" className="text-zinc-600">Basvuru Listesi</Link>
            <button onClick={()=> dispatch(logout()) }><i className="bi bi-arrow-return-right"></i></button>
            
        </div>
    )
}

export default Header
