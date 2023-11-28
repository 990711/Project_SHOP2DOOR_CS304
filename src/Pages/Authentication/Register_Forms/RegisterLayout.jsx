
//import React, { useState } from 'react';
import {
    Drawer,
    Toolbar,
    Grid,
  } from '@mui/material';
  import { Outlet, useNavigate } from 'react-router-dom';
  import { useRef, useState, useEffect } from 'react';
  import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import CustomerRegisterService from '../../../Services/CustomerRegisterService';
  import DeliveryRiderRegisterService from '../../../Services/DeliveryRiderRegisterService';
  import RestaurantRegisterService from '../../../Services/RestaurantRegisterService';
  import ShopOwnerRegisterService from '../../../Services/ShopOwnerRegisterService';
  import SupplierRegisterService from '../../../Services/SupplierRegisterService';
  //import loginService from "../../../Services/loginService";
  import loginService from "../../../Services/loginService";


  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PHONE_REGEX = /^[0][0-9]{9}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const RegisterLayout = () => {
    const [open, setOpen] = useState(true);
    const [step, setStep] = useState(1); // Added step state to manage the registration steps
    const navigate = useNavigate();
    const [role, setRole] = useState('Customer');
  
    const [formValid, setFormValid] = useState(false);

    const userRef = useRef();
    const phoneRef = useRef();

    const errRef = useRef();
  
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
  
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
  
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
  
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Step 2 state and refs
    //const phoneRef = useRef();
    const [shopName, setShopName] = useState('');

    const [branch, setBranch] = useState('');
    const emailRef = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [address, setAddress] = useState('');
    
    const [areaOfPreference, setAreaOfPreference] = useState('');
    const [license, setLicense] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [location, setLocation] = useState('');



  /*
    useEffect(() => {
        emailRef.current.focus();
      }, []);
     */
  
    useEffect(() => {
      setValidName(USER_REGEX.test(user));
    }, [user]);
  
    useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])


    useEffect(() => {
        setErrMsg('');
    }, [name, email, phone, address])
  
    useEffect(() => {
      setErrMsg('');
    }, [user, pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [name, phone, email, areaOfPreference, license, vehicleType, vehicleNo])


    useEffect(() => {
        setErrMsg('');
    }, [name, location, phone, email])

    useEffect(() => {
        setErrMsg('');
    }, [name, email, phone, address])

    

    useEffect(() => {
        setErrMsg('');
    }, [shopName, phone, branch, location, email])

  
    const handleNext = () => {
      if (step === 1) {
        // Validate step 1 and proceed to step 2
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
          setErrMsg('Invalid Entry');
          return;
        }
      } else if (step === 2) {
        // Validate step 2 and submit the form
        // You can add additional validations for step 2 if needed
        const v1 = PHONE_REGEX.test(phone);
        const v2 = EMAIL_REGEX.test(email);
        setFormValid(v1 && v2);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

      }
  
      setStep(step + 1);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Your existing form submission logic

      const v1 = PHONE_REGEX.test(phone);
        const v2 = EMAIL_REGEX.test(email);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        switch (role) {
            case "Customer":
                try {

                // Make an API call to create a user using loginService
                const response = await CustomerRegisterService.createCustomer({
                    username: user,
                    password: pwd,
                    role: role,
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                });
        
        
        
                // Log the response data and access token
                console.log(response?.data);
                console.log(response?.accessToken);
                console.log(JSON.stringify(response));
          
                // Set success state and clear input fields
                setSuccess(true);
                setUser('');
                setPwd('');
                setMatchPwd('');
                setName('');
                setEmail('');
                setPhone('');
                setAddress('');
          
            
              } catch (err) {
                if (!err?.response) {
                  setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                  setErrMsg('Username Taken');
                } else {
                  setErrMsg('Registration Failed');
                }
          
                //errRef.current?.focus();

              }
                break;
            case "Shop Owner":
                try {
                    // Make an API call to create a shop owner using loginService
                    const response = await ShopOwnerRegisterService.createShopOwner({
                        username: user,
                        password: pwd,
                        role: role,
                        shop_name : shopName,
                        contact : phone,
                        branch : branch,
                        location : location,
                        email : email,
                    });
        
                    // Log the response data and access token
                    console.log(response?.data);
                    console.log(response?.accessToken);
                    console.log(JSON.stringify(response));
        
                    // Set success state and clear input fields
                    setSuccess(true);
                    setShopName('');
                    setPhone('');
                    setBranch('');
                    setLocation('');
                    setEmail('');
                    setUser('');
                    setPwd('');
                    setMatchPwd('');
            
                } catch (err) {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 409) {
                        setErrMsg('Contact number Taken');
                    } else {
                        setErrMsg('Registration Failed');
                    }
        
                    //errRef.current?.focus();

                }
                break;
            case "Supplier":
                try {
                    // Make an API call to create a user using loginService
                    const response = await SupplierRegisterService.createSupplier({
                        username: user,
                        password: pwd,
                        role: role,
                        name: name,
                        email: email,
                        contact: phone,
                        address: address,
                    });
            
                    // Log the response data and access token
                    console.log(response?.data);
                    console.log(response?.accessToken);
                    console.log(JSON.stringify(response));
                    
            
                    // Set success state and clear input fields
                    setSuccess(true);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                    setUser('');
                    setPwd('');
                    setMatchPwd('');
            
                    
                  
                    
                    
        
                } catch (err) {
                    
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 409) {
                        setErrMsg('Phone number Taken');
                    } else {
                        setErrMsg('Registration Failed')
                    }
                    
                    //errRef.current?.focus();

                }
                break;
            case "Delivery Rider":
                try {
                    // Make an API call to create a delivery rider using loginService
                    const response = await DeliveryRiderRegisterService.createDeliveryRider({
                        username: user,
                        password: pwd,
                        role: role,
                        name: name,
                        email: email,
                        contact: phone,
                        area_of_pref: areaOfPreference,
                        license : license,
                        vehicle_type: vehicleType,
                        vehicle_no: vehicleNo,
                    });
        
                    // Log the response data and access token
                    console.log(response?.data);
                    console.log(response?.accessToken);
                    console.log(JSON.stringify(response));
        
                    // Set success state and clear input fields
                    setSuccess(true);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setAreaOfPreference('');
                    setLicense('');
                    setVehicleType('');
                    setVehicleNo('');
                    setUser('');
                    setPwd('');
                    setMatchPwd('');
        
                } catch (err) {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 409) {
                        setErrMsg('Contact number Taken');
                    } else {
                        setErrMsg('Registration Failed');
                    }
        
                    //errRef.current?.focus();

                }
                break;
            case "Restaurant Owner":
                try {
                    // Make an API call to create a restaurant using loginService
                    const response = await RestaurantRegisterService.createRestaurant({
                        username: user,
                        password: pwd,
                        role: role,
                        name: name,
                        email: email,
                        contact: phone,
                        location: location,
                    });
        
                    // Log the response data and access token
                    console.log(response?.data);
                    console.log(response?.accessToken);
                    console.log(JSON.stringify(response));
        
                    // Set success state and clear input fields
                    setSuccess(true);
                    setName('');
                    setLocation('');
                    setPhone('');
                    setEmail('');
                    setUser('');
                    setPwd('');
                    setMatchPwd('');
        
                } catch (err) {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 409) {
                        setErrMsg('Contact number Taken');
                    } else {
                        setErrMsg('Registration Failed');
                    }
        
                    //errRef.current?.focus();

                }
                break;
            default:
                break;
        }

    };
  
    const handleRoleChange = (e) => {
      setRole(e.target.value);
    };
  
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



            
            <section>
            <div >

              <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
              </p>
              <h1>Register</h1>
              {step === 1 && (
                <form onSubmit={handleNext}>
                  <label htmlFor="username">
                    Username:
                    <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
                  </label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={userFocus && user && !validName ? 'instructions' : 'offscreen'}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
  
                  <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                    aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                    aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                  </p>
  
                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                    />
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? 'false' : 'true'}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
  
                  <label htmlFor="role">
                    Role:
                  </label>
                  <select
                    type="role"
                    id="role"
                    onChange={handleRoleChange}
                    value={role}
                    required
                  >
                    <option value="Customer">Customer</option>
                    <option value="Shop Owner">Shop Owner</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Delivery Rider">Delivery Rider</option>
                    <option value="Restaurant Owner">Restaurant Owner</option>
                  </select>
  
                  
                  <button type="button" onClick={handleNext} disabled={!validName || !validPwd || !validMatch}>
                    Next
                  </button>
                </form>
              )}
              {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {/* Role-specific form elements */}
                    {role === 'Customer' && (
                    <>
                        <h1>Customer Register</h1>
                        <label htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}aria-describedby="namenote"
                            required
                            
                        />

                        <label htmlFor="email">
                            Email:
                            
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            
                            
                        </label>
                      
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter valid email.
                        </p>

                        <label htmlFor="phone">
                            Phone:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            
                            ref={phoneRef}
                            required
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="phonenote"
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="phonenote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Start with 0.<br />
                            Must include 10 numbers.<br />
                        </p>


                        <label htmlFor="address">
                            Address:
                        </label>
                        <input
                            type="text"
                            id="address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            required
                        />

                    </>
                    )}

                    {role === 'Delivery Rider' && (
                    <>
                        <h1>Delivery Rider Register</h1>

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />

                        <label htmlFor="phone">
                            Phone:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                            </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            ref={phoneRef}
                            required
                            aria-invalid={!validPhone}
                            aria-describedby="contactnote"
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="contactnote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Start with 0.<br />
                            Must include 10 numbers.<br />
                        </p>

                        <label htmlFor="email">
                            Email:
                            
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            
                            
                        </label>
                      
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter valid email.
                        </p>

                        <label htmlFor="areaOfPreference">Area of Preference:</label>
                        <input
                            type="text"
                            id="areaOfPreference"
                            onChange={(e) => setAreaOfPreference(e.target.value)}
                            value={areaOfPreference}
                            required
                        />

                        <label htmlFor="license">License:</label>
                        <input
                            type="text"
                            id="license"
                            onChange={(e) => setLicense(e.target.value)}
                            value={license}
                            required
                        />

                        <label htmlFor="vehicleType">Vehicle Type:</label>
                        <input
                            type="text"
                            id="vehicleType"
                            onChange={(e) => setVehicleType(e.target.value)}
                            value={vehicleType}
                            required
                        />

                        <label htmlFor="vehicleNo">Vehicle No:</label>
                        <input
                            type="text"
                            id="vehicleNo"
                            onChange={(e) => setVehicleNo(e.target.value)}
                            value={vehicleNo}
                            required
                        />
                    </>
                    )}

                    {role === 'Restaurant Owner' && (
                    <>
                        <h1>Restaurant Register</h1>

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />

                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            autoComplete="off"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            required
                        />

                        <label htmlFor="phone">
                            Phone:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            
                            ref={phoneRef}
                            required
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="phonenote"
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="phonenote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Start with 0.<br />
                            Must include 10 numbers.<br />
                        </p>

                        <label htmlFor="email">
                            Email:
                            
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            
                            
                        </label>
                      
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter valid email.
                        </p>
                    </>
                    )}

                    {role === 'Shop Owner' && (
                    <>
                        <h1>Shop Owner Register</h1>

                        <label htmlFor="shopName">Shop Name:</label>
                        <input
                            type="text"
                            id="shopName"
                            autoComplete="off"
                            onChange={(e) => setShopName(e.target.value)}
                            value={shopName}
                            required
                        />

                        <label htmlFor="phone">
                            Phone:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            
                            ref={phoneRef}
                            required
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="phonenote"
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="phonenote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Start with 0.<br />
                            Must include 10 numbers.<br />
                        </p>

                        <label htmlFor="branch">Branch:</label>
                        <input
                            type="text"
                            id="branch"
                            autoComplete="off"
                            onChange={(e) => setBranch(e.target.value)}
                            value={branch}
                            required
                        />

                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            autoComplete="off"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            required
                        />

                        <label htmlFor="email">
                            Email:
                            
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            
                            
                        </label>
                      
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter valid email.
                        </p>
                    </>
                    )}

                    
                    {role === 'Supplier' && (
                    <>
                        <h1>Supplier Register</h1>

                        <label htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}aria-describedby="namenote"
                            required
                            
                        />
                        

                        <label htmlFor="email">
                            Email:
                            
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            
                            
                        </label>
                      
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter valid email.
                        </p>
                   


                        <label htmlFor="phone">
                            Phone:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            
                            ref={phoneRef}
                            required
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="phonenote"
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="phonenote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Start with 0.<br />
                            Must include 10 numbers.<br />
                        </p>

                        <label htmlFor="address">
                            Address:
                        </label>
                        <input
                            type="text"
                            id="address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            required
                        />
                    </>
                    )}
                    

                    {/* Add similar blocks for other roles as needed */}

                    <div>
                        <button type="button" onClick={() => setStep(step - 1)}>
                        Back
                        </button>

                        <span style={{ marginLeft: '10px' }}></span> {/* Adjust the margin as needed */}

                        <button type="submit" disabled={!validName || !validPwd || !validMatch || !validPhone? true : false}>
                        Submit
                        </button>
                    </div>
                </form>
                )}

              <p>
                Already registered?<br />
                <span className="line">
                  <a href="/login">Sign In</a>
                </span>
              </p>
              </div>
            </section>
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
          <Outlet />
        </Grid>
      </Grid>
    );
  };
  
  export default RegisterLayout;
  



/*
//import React, { useState } from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { Dashboard as DashboardIcon, Person as PersonIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Login from './Login';
//import { useNavigate } from "react-router-dom";
import CustomerRegisterService from "../../../Services/CustomerRegisterService";
import DeliveryRiderRegisterService from "../../../Services/DeliveryRiderRegisterService";

import RestaurantRegisterService from "../../../Services/RestaurantRegisterService";

import ShopOwnerRegisterService from "../../../Services/ShopOwnerRegisterService";
import SupplierRegisterService from "../../../Services/SupplierRegisterService";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterLayout = () => {
  const [open, setOpen] = useState(true);
  const [openItems, setOpenItems] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState("Customer"); // Default role is set to "Customer"

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])



    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        let response;

        try {
           
    
            // Log the response data and access token
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));
            
    
            // Set success state and clear input fields
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');

            
            // Redirect based on user role and user ID
            const user_Id = response?.data?.user_Id; // Replace with the actual key used in the response
            switch (role) {
                case "Customer":
                    navigate(`/customerRegister/${user_Id}`);
                    break;
                case "Shop Owner":
                    navigate(`/shopOwnerRegister/${user_Id}`);
                    break;
                case "Supplier":
                    navigate(`/supplierRegister/${user_Id}`);
                    break;
                case "Delivery Rider":
                    navigate(`/deliveryRiderRegister/${user_Id}`);
                    break;
                case "Restaurant Owner":
                    navigate(`/restaurantRegister/${user_Id}`);
                    break;
                default:
                    break;
            }
            
            

        } catch (err) {
            
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            
            errRef.current.focus();
        }
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };




  
  

  return (
    <Grid container>
      {/* Left Sidebar }
      <Grid item xs={6} style={{ overflowY: 'auto', height: '100vh'}}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: '50%',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '50%',
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <section >
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="role">
                            Role:
                        </label>
                        <select
                            type="role"
                            id="role"
                            onChange={handleRoleChange}
                            value={role}
                            required
                            
                        >
                            <option value="Customer">Customer</option>
                            <option value="Shop Owner">Shop Owner</option>
                            <option value="Supplier">Supplier</option>
                            <option value="Delivery Rider">Delivery Rider</option>
                            <option value="Restaurant Owner">Restaurant Owner</option>
                            
                        </select>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <a href="/login">Sign In</a>
                        </span>
                    </p>
                </section>
        </Drawer>
      </Grid>

      {/* Content }
      <Grid item xs={6} style={{ padding: '10px 1px 1px', overflowY: 'auto', height: '100vh' }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default RegisterLayout;
*/
