import { Link } from "react-router-dom"

const Supplier = () => {
    return (
        <section>
            <h1>Supplier Page</h1>
            <br />
            <p>You must have been assigned an Supplier role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Supplier