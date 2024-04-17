import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import MongoClient from 'mongodb';
import bcrypt from 'bcrypt';

mongoose.connect(process.env.DSN);

//film Schema
const FilmData = new mongoose.Schema({
    roll: {
        type: Number,
        required: true
    }, 
    shot: {
        type: String, 
        required: true
    }, 
    take: {
        type: Number, 
        required: true
    },
    fps: {
        type: Number, 
        required: true
    },
    filmRem: {
        type: Number, 
        required: true
    }, 
    timeRem: {
        type: Number, 
        required: true
    }, 
    notes: {
        type: String, 
        required: false
    }
})
//day Schema
const daySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    }, 
    filmData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FilmData'
    }]
})


//project Schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'daySchema'
    }]
});


const userSchema = new mongoose.Schema({
    userName: {
        type: {
            type: String,
            required: true
        },
    },
    password:{
        type: String, 
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectSchema'
    }]

})

userSchema.pre('save', async function(next){
    try{
        if(this.isModified('password')){
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    }catch(error){
        next(error);
    }
})


userSchema.plugin(passportLocalMongoose);

mongoose.model('Day', daySchema);
mongoose.model('Project', projectSchema);
mongoose.model('User', userSchema);