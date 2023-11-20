import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/home">Visit Our Homepage</Link>
            </div>
        </article>
        </div>
    )
}

export default Missing