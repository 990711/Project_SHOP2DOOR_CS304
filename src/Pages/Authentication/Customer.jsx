import { Link } from "react-router-dom"

const Customer = () => {
    return (
        <section>
            <h1>Customer Page</h1>
            <br />
            <p>You must have been assigned an Customer role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Customer