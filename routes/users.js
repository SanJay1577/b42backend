import express from "express";
import bcrypt from "bcrypt";
import { addUsers, generateToken, getAllUsers, getUser } from "../controllers/users.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const user = await getUser(req.body.email);
    if (!user) {
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedUser = await { ...req.body, password: hashedPassword };
      await addUsers(hashedUser);
      res.status(200).json({ message: "Successfully signed up" }); 
      return
    }
    res.status(400).json({message: "Given email already exist"});
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/login", async(req, res) => {
    try {
        // user email is available
        const user = await getUser(req.body.email); 
        if(!user){
          return res.status(404).json({message:"Invalid Email"})
        } 
        //decrypt and comapre
        const validatePassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
       if (!validatePassword){
        res.status(400).json({message:"Invalid Password"})
        return
       }
        const token = generateToken(user._id);
        return res.status(200).json({message:"Succesfully logged in", token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
})


router.get("/", async(req, res)=>{
    try {
        const result = await getAllUsers(); 
        return res.status(200).json({data:result})
    } catch (error) {
        console.log(error)
       return res.status(500).json({ message: "Internal server error" });
    }
})

export const userRouter = router;
