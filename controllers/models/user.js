const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(val) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
                return emailRegex.test(val); 
            }
      
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(val) {
                // Strong password validation: at least 1 uppercase, 1 lowercase, 1 number, 1 special char
                return /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }
    },
   name:{
        type: String,
        maxLength: 100,
        trim: true,
        validate: {
            validator: function(v) {
               
                return /^([a-zA-Z]+(?: [a-zA-Z]+)+)$/.test(v);
            },
            message: 'Name must contain at least a first and last name.'
        },
        default: ''
    }
})

const imageSchema = mongoose.Schema({
    images: {
        type: String,
        default: null
    }
})


userSchema.pre('save', async function (next) {
    try {
      
        const user = this;
    
        // Password hashing
        if (user.isModified('password')) {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
        }
        next();
    } catch (err) {
        next(err);
    }
});
const User=mongoose.model('User', userSchema);
const Images = mongoose.model('Images', imageSchema);
module.exports = { User, Images };