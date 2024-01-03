const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const AdminUserSchema = mongoose.Schema({
    user: {
        required : [true, "Please provide a user name"],
        type: String,
        unique: true,
    },
    password: {
        required: [true, "Please provide a password"],
        type: String,
        select: false
    },
})

AdminUserSchema.methods.correctPassword = async function (candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const AdminUser = mongoose.model("AdminUser", AdminUserSchema)

module.exports = AdminUser