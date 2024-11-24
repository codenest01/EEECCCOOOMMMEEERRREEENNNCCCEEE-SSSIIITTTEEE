const user_Data = require("../models/userModel")
const bcrypt = require("bcrypt")

exports.signup = async function (req, res) {
    try{
        const { name, email , password} = req.body;

        //Avoid  Empty data from user
        if (!name || !password) {
            return res.status(400).json({
                msg: "DAta is required "
             }) }

              //Aviod  same user  to signup
        const userExists = await user_Data.findOne({email })
        if (userExists) {
            return res.status(400).json({
                msg: "User Already exist"
             }) }

         //Create a new User
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         const user = new user_Data({ password:hashedPassword ,email ,name});
         await user.save()
         console.log(name , password)
 
         return res.status(201).json({
             msg:"User created successfully",
             success:true
         })

    }catch(err){
        console.error(err)
        return res.status(500).json({
            msg: "Internal server error."
        });
    }
}