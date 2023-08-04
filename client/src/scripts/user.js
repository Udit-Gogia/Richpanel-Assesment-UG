import Cookies from "js-cookie";

export function biteCookie(key, value) {
    Cookies.set(key, `${value}`, { expires: 7 });
}

export async function loginUser(userData, setErrMessage) {
    const response = await fetch(`/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    const { token } = await result;
    // token !== undefined && saveToLS("token", token);
    token !== undefined && biteCookie("token", token);

    if (response.status === 404) {
        setErrMessage("Email Address not found");
    } else if (response.status === 400) {
        setErrMessage("Unable to login, Please check credentials");
    } else {
        setErrMessage("");
    }



    return result;
}