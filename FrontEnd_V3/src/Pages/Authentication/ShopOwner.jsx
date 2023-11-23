import { Link } from "react-router-dom"

const ShopOwner = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <section>
            
            <h1>ShopOwner Page</h1>
            <br />
            <p>You must have been assigned an ShopOwner role.</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
        </div>
    )
}

export default ShopOwner