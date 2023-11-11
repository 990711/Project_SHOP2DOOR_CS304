import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import bgImg from "../assets/Grocery Delivery Final.png";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from '../UserContext';

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loginError, setLoginError] = useState(null);
    const { username, setUser } = useUser();

    const onSubmit = (data) => {
        // Replace this with your actual login logic, e.g., sending a request to a server.
        const requestData = {
            name: data.name,
            password: data.password,
        };
        console.log(requestData);
        axios
            .post("http://localhost:8080/api/v1/login", requestData)
            .then((response) => {
                console.log(response);
                // Check if the response contains the expected JSON structure and a 200 status code
                if (
                    response.data.id !== undefined &&
                    response.data.name !== undefined &&
                    response.status === 200
                ) {
                    setUser(response.data.name);
                    console.log("Login successful");
                    navigate('/products');
                    // You can navigate to the "/ViewProducts" route here, for example:
                    // history.push("/ViewProducts");
                } else {
                    setLoginError("Server response does not match the expected format");
                }
            })
            .catch((error) => {
                // Handle errors, such as network issues or server errors
                console.error("Error:", error);
                setLoginError("An error occurred during login.");
            });
    };

    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Login</h2>

                    <span className="instruction">Enter your credentials to access <br></br> the service</span>

                    <form
                        id="form"
                        className="flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Username"
                        />
                        {errors.username && (
                            <p className="error-message">Username is required</p>
                        )}

                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="error-message">Password is required</p>
                        )}
                        <div>
                            <Link
                                className="text-decoration-none btn btn-sm btn-info custom-button "
                                to={"/register"}
                                style={{ backgroundColor: "green", color: "white" }}
                            >
                                {" "}Register{" "}
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-sm btn-info custom-button"
                                style={{ backgroundColor: "green", color: "white" }}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {loginError && <p className="error-message">{loginError}</p>}
                </div>
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
            </div>
        </section>
    );
}
