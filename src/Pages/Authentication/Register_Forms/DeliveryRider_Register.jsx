import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import loginService from "../../../Services/loginService";

const PHONE_REGEX = /^[0][0-9]{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DeliveryRider_Register = () => {
    const phoneRef = useRef();
    const errRef = useRef();
    const emailRef = useRef();


    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [areaOfPreference, setAreaOfPreference] = useState('');
    const [license, setLicense] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');

    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        phoneRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])


    useEffect(() => {
        setErrMsg('');
    }, [name, phone, email, areaOfPreference, license, vehicleType, vehicleNo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = PHONE_REGEX.test(phone);
        const v2 = EMAIL_REGEX.test(email);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // Make an API call to create a delivery rider using loginService
            const response = await loginService.createDeliveryRider({
                name: name,
                email: email,
                phone: phone,
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

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Contact number Taken');
            } else {
                setErrMsg('Registration Failed');
            }

            errRef.current.focus();
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Delivery Rider Register</h1>
                    <form onSubmit={handleSubmit}>
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

                        <button disabled={!validPhone ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <a href="/login">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default DeliveryRider_Register;
