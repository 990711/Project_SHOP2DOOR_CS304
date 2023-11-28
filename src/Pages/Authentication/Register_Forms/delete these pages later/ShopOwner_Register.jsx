import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import loginService from "../../../../Services/loginService";

const PHONE_REGEX = /^[0][0-9]{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const ShopOwner_Register = () => {
    const phoneRef = useRef();
    const errRef = useRef();
    const emailRef = useRef();


    const [shopName, setShopName] = useState('');
    const [phone, setPhone] = useState('');
    const [branch, setBranch] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

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
    }, [shopName, phone, branch, location, email])

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
            // Make an API call to create a shop owner using loginService
            const response = await loginService.createShopOwner({
                shopName : shopName,
                phone : phone,
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
                    <h1>Shop Owner Register</h1>
                    <form onSubmit={handleSubmit}>
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

export default ShopOwner_Register;
