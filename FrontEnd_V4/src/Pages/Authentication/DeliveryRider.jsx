import { Link } from "react-router-dom"

const DeliveryRider = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <section>
            <h1>DeliveryRider Page</h1>
            <br />
            <p>You must have been assigned an DeliveryRider role.</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
        </div>
    )
}

export default DeliveryRider