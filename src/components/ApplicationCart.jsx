import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import { formatter } from "../helpers/dateFormatter";

function ApplicationCart({item}) {


    return (
        <div className="border rounded-3xl py-5 flex flex-col gap-5 ">
            <p className="text-lg"> {item.name} {item.lastName} </p>
            <p> {formatter.format(new Date(item.createdAt))} </p>
            <Link to={`/admin/basvuru/${item.appCode}`} ><button className="text-white bg-orange-500">Başvuruyu Görüntüle</button></Link>
        </div>
    )
}

ApplicationCart.propTypes = {
    item: PropTypes.object
}

export default ApplicationCart
