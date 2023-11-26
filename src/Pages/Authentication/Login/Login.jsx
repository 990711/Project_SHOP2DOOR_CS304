import { useRef, useState, useEffect, useContext } from 'react';
import loginService from "../../../Services/loginService";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [role, setRole] = useState("Customer");

    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate(); // Add this line


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to create a user using loginService
            const response = await loginService.createUserLogin({
                username: user,
                password: pwd,
                role: role,
            });

            
            console.log(response?.data);
            //console.log(response?.accessToken);
            console.log(JSON.stringify(response));

            //const accessToken = response?.data?.accessToken;
            console.log({ user, pwd, role});
            console.log(useAuth);
            console.log(typeof setAuth);

            /*
            if(response?.data?.accessToken){
                loginService.setToken(response?.data?.accessToken);
                navigate('/home');
            }
            */

            //const userData = { user, pwd, role };

            // Invoke setAuth with the new user data
            //setAuth(userData); // The error seems to be here


            //setAuth({ user, pwd, role });

            // Example user data
     // const userData = { user: 'bhashini', pwd: '!@#123QWEqwe', role: 'Customer' };

      // Invoke setAuth with the new user data
     // setAuth(userData);

            setUser('');
            setPwd('');
            setSuccess(true);
           

            navigate(from, { replace: true });
    

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
    }



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {success ? (
                
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/customermainlayout/dashboard">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />


                        <label htmlFor="role">
                            Role:
                        </label>
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

                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Login







/*
import { useRef, useState, useEffect, useContext } from 'react';
import loginService from "../../../Services/loginService";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [role, setRole] = useState("Customer");

    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate(); // Add this line


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to create a user using loginService
            const response = await loginService.createUserLogin({
                username: user,
                password: pwd,
                role: role,
            });

            
            console.log(response?.data);
            //console.log(response?.accessToken);
            console.log(JSON.stringify(response));

            //const accessToken = response?.data?.accessToken;
            console.log({ user, pwd, role});
            console.log(useAuth);
            console.log(typeof setAuth);

            const userData = { user, pwd, role };

            // Invoke setAuth with the new user data
            //setAuth(userData); // The error seems to be here


            //setAuth({ user, pwd, role });

            // Example user data
     // const userData = { user: 'bhashini', pwd: '!@#123QWEqwe', role: 'Customer' };

      // Invoke setAuth with the new user data
     // setAuth(userData);

            setUser('');
            setPwd('');
            setSuccess(true);
           

            navigate(from, { replace: true });
    

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
    }



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />


                        <label htmlFor="role">
                            Role:
                        </label>
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

                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here}
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Login







*/