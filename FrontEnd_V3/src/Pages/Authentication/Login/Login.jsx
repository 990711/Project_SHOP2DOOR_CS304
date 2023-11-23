import { useRef, useState, useEffect, useContext } from 'react';
import loginService from "../../../Services/loginService";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import bgImg from "../../../assets/Grocery Delivery Final.png";
const Login = () => {
    const [role, setRole] = useState("Customer");

    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginService.createUserLogin({
                username: user,
                password: pwd,
                role: role,
            });

            console.log(response?.data);
            console.log(JSON.stringify(response));

            const userData = { user, pwd, role };
            setUser('');
            setPwd('');
            setSuccess(true);

            navigate('/home', { replace: true }); // Navigates to the home page upon successful login
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div class="container">
            <div className="centered-box">
        <div className="register">
            <div className="col-1">
                {success ? (
                    <section>
                        <h1>You are logged in!</h1>
                        <br />
                        <p>
                            <a href="/home">Go to Home</a>
                        </p>
                    </section>
                ) : (
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className="center">Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username" color='black'>Username:</label>
                            <br />
                            <input
                                type="text"
                                id="username"
                                placeholder='username'
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <br />
                            <br />
                            <label htmlFor="password">Password:</label>
                            <br />
                            <input
                                type="password"
                                id="password"
                                placeholder='password'
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <br />
                            <label htmlFor="role">Role:</label>
                            <select
                                type="role"
                                id="role"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                required
                            >
                                <option value="Customer">Customer</option>
                                <option value="Shop Owner">Shop Owner</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Delivery Rider">Delivery Rider</option>
                                <option value="Restaurant Owner">Restaurant Owner</option>
                            </select>
                            <br />
                            <button className='sign_in_btn'>Sign In</button>
                        </form>
                        <p>
                            <span className="signup-text">Need an Account?</span><br />
                            <span className="line">
                                <a href="/register" className="signup-link">Sign Up</a>
                            </span>
                        </p>
                    </section>
                )}
            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
        </div>
        
        </div>
    );
};

export default Login;
