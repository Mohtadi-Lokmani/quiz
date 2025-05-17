const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    
});



// Static method for signup
userSchema.statics.signup = async function (name, email, password) {
    // Validation
    if (!name || !email || !password) {
        throw new Error('All fields must be filled');
    }

    if (!validator.isLength(name, { min: 5 })) {
        throw new Error('Name must be at least 6 characters long');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    }

if (!validator.isLength(password,{min : 8})){
    throw new Error ('Password must be 8 caracter length ')
}  

   if (!/[A-Z]/.test(password)) {
    throw new Error('Password must include at least one uppercase letter.');
}
if (!/[a-z]/.test(password)) {
    throw new Error('Password must include at least one lowercase letter.');
}
if (!/[0-9]/.test(password)) {
    throw new Error('Password must include at least one number.');
}
if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new Error('Password must include at least one special character.');
}

    // Check if the email is already in use
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error('Email already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create user
    const user = await this.create({ name, email, password: hash });
    return user;
};

// Static method for login
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect password');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);