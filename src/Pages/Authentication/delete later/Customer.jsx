import { Link } from "react-router-dom"

const Customer = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <section>
            <h1>Customer Page</h1>
            <br />
            <p>You must have been assigned an Customer role.</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
        </div>
    )
}

export default Customer