import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <section>
            <h1>The Lounge</h1>
            <br />
            <p>shopowner and suppliers can hang out here.</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
        </div>
    )
}

export default Lounge