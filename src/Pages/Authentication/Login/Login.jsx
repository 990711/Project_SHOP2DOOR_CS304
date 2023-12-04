import { useRef, useState, useEffect, useContext } from 'react';
import loginService from "../../../Services/loginService";
//import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    Toolbar,
    Grid,
  } from '@mui/material';
  import { Outlet, useNavigate } from 'react-router-dom';
  
  import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

  const Login= ()=>{

    const [role, setRole] = useState("Customer");

    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState(''); // Declare state variable

    
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate(); // Add this line

    const [open, setOpen] = useState(true); // Set the initial state to true to open the drawer.




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
            console.log(response?.data.user.username);
            console.log(response?.data);
            console.log(user); 

            /*
            setUser('');
            setPwd('');
            setSuccess(true);
           */
            setUser(response?.data.user.username); // Assuming response.data contains user information


            switch (role) {
                case "Customer":
                    navigate("/customermainlayout");
                    break;
                case "Shop Owner":
                    navigate("/", { state: { user } });
                    break;
                case "Supplier":
                    navigate("");
                    break;
                case "Delivery Rider":
                    navigate("");
                    break;
                case "Restaurant Owner":
                    navigate("");
                    break;
                default:
                    break;
            }
    

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
        <Grid container>
          {/* Left Sidebar */}
          <Grid item xs={6} style={{ overflowY: 'auto', height: '100%' }}>
          
          <Drawer
              variant="persistent"
              anchor="left"
              open={open}
              sx={{
                width: '50%',
                //height: '100%', // Set the height to 100%
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: '50%',
                  boxSizing: 'border-box',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <Toolbar />

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
                            value={user} // Use the user state directly here
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
                            <a href="/registerlayout">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
  
  
  
              
           
            </Drawer>
          </Grid>
    
          {/* Content */}
          <Grid item xs={6} style={{ 
              padding: '10px 1px 1px', 
              overflowY: 'auto', 
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
               }}>
            <Outlet user={user} />
          </Grid>
        </Grid>
      );
    };



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