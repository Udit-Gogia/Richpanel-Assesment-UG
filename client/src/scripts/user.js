import Cookies from "js-cookie";

export function biteCookie(key, value) {
    Cookies.set(key, `${value}`, { expires: 7 });
}

export async function loginUser(userData) {
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
        // setErrMessage("Email Address not found");
        console.log("Email Address not found")
    } else if (response.status === 400) {
        console.log("Unable to login, Please check credentials");
    } else {
        console.log("");
    }

    return result;
}


export const signinUser = async (userData) => {
    const response = await fetch(`/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.status === 409) {
        console.log("Another user with same email address already exists");
    } else if (response.status === 400) {
        const code = response.headers.get("code");
        console.log(response, code);
        if (code === "pwdRep") {
            console.log('Password cannot contain the word "password"');
        }
    } else {
        const { token } = await result;
        biteCookie("token", token);

    }

    return result;
};