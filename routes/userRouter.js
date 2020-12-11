const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/Users");


router.post("/register", async (req, res) => {
    try{
        const { email, password, passwordCheck, displayName } = req.body;
        // validation
        if (!email || !password || !passwordCheck)
            return res.status(400).json({msg: "All field required."});
        if (password.length < 5)
            return res.status(400).json({msg: "The password needs to be at least 5 character long."});
        if (password !== passwordCheck)
            return res.status(400).json({msg: "Enter the same pssword twice for varification"});
        
        const existingUser = await User.findOne({email: email});
        if (existingUser)
            return res.status(400).json({msg: "An account with this email already exist."});
        
        if (!displayName) 
            displayName = email;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);


        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        const savedUser = await newUser.save();
        res.send(savedUser);

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;