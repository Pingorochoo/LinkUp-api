import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            require: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            require: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            require: true,
            min: 7,
            max: 254,
            unique: true
        }
        ,
        password: {
            type: String,
            require: true,
            min: 5,
            max: 254,
        },
        picture: {
            type: String,
            default: ''
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number
    },
    {
        timestamps: true,
        strict: 'throw'
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.isPasswordMatched = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = model('User', UserSchema)
export default User

