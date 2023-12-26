import Header from "./Header"
import PropTypes from "prop-types"

function ApplicationLayout({children}) {
    return (
        <div className="grid w-full">
            <Header />
            {children}
        </div>
    )
}

ApplicationLayout.propTypes = {
    children: PropTypes.node
}

export default ApplicationLayout
