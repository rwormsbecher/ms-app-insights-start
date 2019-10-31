import React, { useState, useEffect } from "react";
import "./App.css";
import { acquireGraphToken, getGraphToken } from "./adalConfig";
import Axios from "axios";

function App() {
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            acquireGraphToken();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // same as  componentDidMount
    useEffect(() => {
        async function fetchDataFromGraph() {
            await acquireGraphToken();
            let graphToken = await getGraphToken();

            try {
                let response = await Axios({
                    url: `https://graph.microsoft.com/v1.0/me/`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${graphToken}` }
                });

                setUserData(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchDataFromGraph();
    }, []);

    return <div className="App">Welcome, {userData.givenName}</div>;
}

export default App;
