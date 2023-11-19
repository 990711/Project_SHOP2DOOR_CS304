import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/customer">Go to the Customer page</Link>
            <br />
            <Link to="/shopOwner">Go to the ShopOwner page</Link>
            <br />
            <Link to="/deliveryRider">Go to the DeliveryRider page</Link>
            <br />
            <Link to="/supplier">Go to the Supplier page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
        </div>
    )
}

export default Home