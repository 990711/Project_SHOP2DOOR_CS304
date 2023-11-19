import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import loginService from "../../Services/loginService";

const PHONE_REGEX = /^[0][0-9]{9}$/;

const ShopOwner_Register = () => {
    const phoneRef = useRef();
    const errRef = useRef();

    const [shopName, setShopName] = useState('');
    const [contact, setContact] = useState('');
    const [branch, setBranch] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');

    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        phoneRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(contact));
    }, [contact])

    useEffect(() => {
        setErrMsg('');
    }, [shopName, contact, branch, location, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const validContact = PHONE_REGEX.test(contact);
        if (!validContact) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // Make an API call to create a shop owner using loginService
            const response = await loginService.createShopOwner({
                shopName,
                contact,
                branch,
                location,
                email,
            });

            // Log the response data and access token
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));

            // Set success state and clear input fields
            setSuccess(true);
            setShopName('');
            setContact('');
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

                        <label htmlFor="contact">Contact:</label>
                        <input
                            type="text"
                            id="contact"
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
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

                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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

export default ShopOwner_Register;
