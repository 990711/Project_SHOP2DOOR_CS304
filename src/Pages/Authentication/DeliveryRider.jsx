import { Link } from "react-router-dom"

const DeliveryRider = () => {
    return (
        <section>
            <h1>DeliveryRider Page</h1>
            <br />
            <p>You must have been assigned an DeliveryRider role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default DeliveryRider