import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
//import Register from './Register';
import bgImg from '../assets/Grocery Delivery Final.png';



//import axios from './api/axios';
const LOGIN_URL = '/auth';


const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
           <div className="register">
           <div className="col-1">
           {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="center">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" color = 'black'>Username:</label>
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
                        <button className = 'sign_in_btn'>Sign In</button>
                    </form>
                    <p>
                <span className="signup-text">Need an Account?</span><br />
                <span className="line">
        {/*put router link here*/}
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
    )
}

export default Login