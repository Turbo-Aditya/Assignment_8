const { User, Images } = require("./models/user")


const authController = {

    async register(req,res,next) {
        try{
            const{email, password, name} = req.body
           
            const user = new User({
                email,
                password,
                name
            });

            await user.save()
            return res.status(201).json({
                message: "User registered successfully",
                user
            });
        } catch(err){
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors
                });
            }
            throw err;
        }
    },

async editUser(req, res, next){
    try{
        const {id, name, password} = req.body
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.password = password; 

        await user.save();
        return res.status(200).json({ message: "User details updated successfully", user });

    }
    catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
        
    }
},

async deleteUser(req,res,next){
    try{
   const {email } = req.body;
    await User.deleteOne({email});
    return res.status(200).json('User Deleted');

} catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server error" });
}

},

async getAll(req, res, next) {
    try{
const allUsers = await User.find()
return res.status(200).json(
    {message: 'List of all users',
    users: allUsers}
    )


    }
 catch(err){
    console.log(err)
    return res.status(500).json({ message: "Internal server error" });


}
}, 

async uploadImages(req, res, next) {
    try{

        const file = req.file;
      const updatedUserImage =  await new Images({
      images:  file.path});
      updatedUserImage.save();
      
       return  res.json({message: "File uploaded", imagePath: file.path});

    }catch(err) {
        return res.status(500).json({ message: "Invalid Format" });
    }
}


}

module.exports = authController;