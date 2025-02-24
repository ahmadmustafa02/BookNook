import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword= await bcryptjs.hash(password, 10)

        
        
        const newUser = new User({ fullName: fullName,
        email: email, 
        password: hashPassword });


        
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully", newUser:{
            id:newUser.id,
            fullName:newUser.fullName,
            email:newUser.email,
        } });
    } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
}

};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch= await bcryptjs.compare(password, user.password); 
        if (!user ||!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        else {
            res.status(200).json({ message: "Login Successful",user:{
                id:user.id,
                fullName:user.fullName,
                email:user.email,
               
            }})
        }

}
catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
}
}