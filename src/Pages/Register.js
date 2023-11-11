import React from "react";
import bgImg from "../assets/Grocery Delivery Final.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/v1";

export default function Form() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data) => {
        if (data.password !== data.confirmpwd) {
            // Handle the case where the passwords don't match
            console.error("Passwords do not match.");
            return;
        }
        // Prepare the request data based on your form fields
        const requestData = {
            name: data.name,
            password: data.password,
            mobileNo: data.mobileNo,
            address: data.address,
            email: data.email,
        };
        // Make a POST request to the API endpoint
        console.log(requestData);
        axios
            .post(`${BASE_API_URL}/register`, requestData)
            .then((response) => {
                // Handle the response here
                console.log("Sign-in successful", response.data);
                navigate('/');

                // You can navigate to a different route on successful sign-in
                // For example, navigate to "/ViewProducts"
            })
            .catch((error) => {
                // Handle errors
                console.error("Sign-in failed", error);

                // You can also display an error message to the user
            });
    };

    // console.log(watch('username'));

    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Register</h2>
                    <span className="instruction">Register and enjoy the service</span>

                    <form
                        id="form"
                        className="flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="User Name"
                        />
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="password"
                        />
                        <input
                            type="password"
                            {...register("confirmpwd", { required: true })}
                            placeholder="confirm password"
                        />
                        <input
                            type="text"
                            {...register("mobile", { maxLength: 12 })}
                            placeholder="Mobile Number"
                        />
                        <input
                            type="text"
                            {...register("address")}
                            placeholder="Address"
                        />
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="email"
                        />
                        {errors.username?.type === "required" && "User Name is required."}
                        {errors.mobile?.type === "required" && "Mobile Number is required."}
                        {errors.mobile?.type === "maxLength" && "Incorrect Number"}
                        <div>
                            <Link
                                className="text-decoration-none btn btn-sm btn-info custom-button "
                                to={"/"}
                                style={{ backgroundColor: "green", color: "white" }}
                            >
                                {" "}Login Instead{" "}
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-sm btn-info custom-button"
                                style={{ backgroundColor: "green", color: "white" }}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
            </div>
        </section>
    );
}

