import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import "../style/Githubauth.css";
import { AuthContext } from "../Github";

const Githubauth = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    const { client_id, redirect_uri } = state;

    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        // If Github API returns the code parameter
        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);
            setData({ ...data, isLoading: true });

            const requestData = {
                code: newUrl[1]
            };

            const proxy_url = state.proxy_url;

            // Use code parameter and other parameters to make POST request to proxy_server
            fetch(proxy_url, {
                method: "POST",
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: "LOGIN",
                        payload: { user: data, isLoggedIn: true }
                    });
                })
                .catch(error => {
                    setData({
                        isLoading: false,
                        errorMessage: "Sorry! Login failed"
                    });
                });
        }
    }, [state, dispatch, data]);

    if (state.isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="authdiv1">
            <section className="authsec1">
                <img
                    src='https://image.flaticon.com/icons/png/512/25/25231.png'
                    alt='github logo'
                    className="authimg"
                />
                <section className="authsec2">
                    <h2>Authorization</h2>
                    <label for="authpasswotd">You will be redirected to github</label>
                    <section className="authsec3">
                        <span>{data.errorMessage}</span>
                        {data.isLoading ? (
                            <div className="loader-container">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <>
                                {
                                    
                                }



                                <a
                                    className="authbtn1"
                                    href={`https://github.com/login/oauth/authorize?scope=user&client_id=${"feada197252d90d18e3c"}&redirect_uri=${"http://localhost:3000/github/githubgivepermission"}`}
                                    onClick={() => {
                                        setData({ ...data, errorMessage: "" });
                                    }}
                                >
                                        Continue
                                    
                                </a>
                            </>
                        )}
                    </section>
                </section>
            </section>
        </div>
    )
}

export default Githubauth
