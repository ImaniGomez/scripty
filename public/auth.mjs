import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
UserSchema = mongoose.model('User');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserialieUser());