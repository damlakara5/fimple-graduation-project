import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllApplications, sortApplicationsByNewest, sortApplicationsByOldest } from "../store/applicationSlice"
import ApplicationCart from "../components/ApplicationCart"

function AdminApplicationList() {
    const dispatch = useDispatch()
    const {allApplications, status} = useSelector(state => state.application)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        dispatch(getAllApplications())
    } , [dispatch])
    
    
    useEffect(() => {
        console.log(status);
        // Any other side effects related to status change
    }, [status]);

    // Conditional rendering based on `status` and `applications`
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if(allApplications?.length === 0) return <p>There are no applications yet.</p>

    return (
        <div className="w-full grid  md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-5 px-5 ">
            <div className="col-span-full flex justify-end relative">
                 <button onClick={toggleDropdown}><i className="bi bi-filter-circle"></i></button>
                 {isDropdownOpen && (
                <div className="dropdown-menu absolute top-10 right-0 mt-2 bg-white shadow-lg z-50 py-2 ">
                    <div onClick={() => dispatch(sortApplicationsByNewest())} className="dropdown-item px-4 py-2 hover:bg-gray-100">Sort (Last Added)</div>
                    <div onClick={() => dispatch(sortApplicationsByOldest())} className="dropdown-item px-4 py-2 hover:bg-gray-100  ">Sort (First Added)</div>
                </div>
                )}
            </div>
            {
                allApplications?.map(item => <ApplicationCart item={item} key={item._id}  />)
            }
        </div>
    )
}

export default AdminApplicationList
