import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/home">Home</Link>
            <Link to="/customer">customer Page</Link>
            <Link to="/shopOwner">shopOwner Page</Link>
            <Link to="/deliveryRider">deliveryRider Page</Link>
            <Link to="/supplier">supplier Page</Link>
        </section>
        </div>
    )
}

export default LinkPage