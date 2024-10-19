import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { setTimeoutTime } from "./constants";

const verifyUserAuthentication = async (navigate: NavigateFunction) => {
    try {
        const response = await axios.get("https://my-encryption-app.onrender.com/api/v1/user/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.status === 200 && response.data.success !== false) {
            const { id, firstName } = response.data.user;
            return { id, firstName };
        } else {
            setTimeout(() => {
                // navigate("/SignUp");
            }, setTimeoutTime);
            return null;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setTimeout(() => {
                // navigate("/SignUp");
            }, setTimeoutTime);
        } else {
            console.log('error = ', error);
            // navigate("/SignUp");
        }
        return null;
    }
};

export default verifyUserAuthentication;
