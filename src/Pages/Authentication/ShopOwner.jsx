import { Link } from "react-router-dom"

const ShopOwner = () => {
    return (
        <section>
            <h1>ShopOwner Page</h1>
            <br />
            <p>You must have been assigned an ShopOwner role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default ShopOwner