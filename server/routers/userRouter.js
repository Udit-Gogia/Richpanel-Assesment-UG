const express = require("express")
const auth = require("../middleware/auth");
const User = require("../models/user");
const router = new express.Router()


router.post("/user/login", async (req, res) => {

    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (err) {
        if (err.message === "Passwords do not match") {
            return res.status(400).send({
                err: "Unable to login",
                msg: "Passwords do not match",
                code: "invPwd",
            });
        }
        res.status(404).send({
            err: "Invalid login credentials",
            msg: "No User found",
            code: "noUser",
        });
    }
});

router.post("/users", async (req, res) => {

    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();

        console.log("2.3 after returning to main function")

        await user.save();

        console.log("3. saved user")
        res.status(201).send({ user, token });
    } catch (err) {
        console.log(err)
        // 409 status code represents conflit
        if (err.toString().includes("duplicate key error")) {
            return res
                .status(409)
                .send({ err, msg: "User already exists", code: "dupUser" });
        } else if (
            err.toString().includes("Password cannot contain the word password")
        ) {
            res.setHeader("code", "pwdRep");
            return res.status(400).send({
                err,
                msg: 'Password cannot contain the word "password".',
                code: "pwdRep",
            });

        }

        res.status(500).send(err);
    }
});

router.post("/user/logout", auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter((tokens) => tokens.token !== req.token);

        await user.save();
        res.send({
            msg: "Logout Successful",
            code: "removed-token",
        });
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
