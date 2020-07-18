require('dotenv').config({path: '../.env'})
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const keys = require("../../config/keys");
const secretOrKey = process.env.secretOrKey
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const uuidv1 = require('uuid/v1');
const sgClient = require('@sendgrid/client');
sgClient.setApiKey(process.env.SENDGRID_API_KEY);

var unirest = require("unirest");

const register = async data => {
  try {
    // run data through the validator which returns if the data isValid
    // and if not it returns a message for the client side
    const { message, isValid } = validateRegisterInput(data);

    // if the data we received is invalid, throw the error message from validator
    if (!isValid) {
      throw new Error(message);
    }

    const { first, last, email, username, password } = data;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("Email already in use");
    }

    const uid = uuidv1()
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(
      {
        uid,
        first,
        last,
        username,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save().catch(err => {
      console.log("error!", err);
      throw new Error("oops! Please try again later");
    });
    var req = unirest("PUT", "https://api.sendgrid.com/v3/marketing/contacts");

				req.headers({
				"content-type": "application/json",
				"authorization": `Bearer ${process.env.SENDGRID_API_KEY}`
				});

				req.type("json");
				await req.send({
				
				"contacts": [
					{
					"email": email,
					}
				]
				}).then((result) => {
					console.log("added to email list")
				
					
				  }).catch((error) => {
					  success = false
					  console.log("error results", error);
				  });
    const token = jwt.sign({ id: user.uid }, secretOrKey);
    // console.log(token)
    console.log("UID:",user.uid)
    return {
      token,
      loggedIn: true,
      ...user._doc,
      password: null,
      _id: user.uid
    }; 
      
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {

    const { email, password, isGoogle } = data;
    const existingUser = await User.findOne({ email });

    if(isGoogle){

        // const existingUser = await User.findOne({ email });
        if (!existingUser) {
          throw new Error("It appears you do not have an account (or at least not one associated with this email)! Please sign up :)")
        } else {
          const token = jwt.sign({ id: existingUser.uid }, secretOrKey);
          return { existingUser, token, loggedIn: true, _id: existingUser.uid };
        }

    }
    const { message, isValid } = validateLoginInput(data);
    
    
    if (!isValid) {
      throw new Error(message);
    }

    if (!existingUser) {
      throw new Error("Account with that email does not exist");
    }

    

    

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      throw new Error("Incorrect password");
    } else {
      const token = jwt.sign({ id: existingUser.uid }, secretOrKey);
      return { existingUser, token, loggedIn: true, _id: existingUser.uid };
    }
  } catch (err) {
    throw err;
  }
};

const admin = async data => {
  try {

    const { email, password} = data;
    const { message, isValid } = validateLoginInput(data);
    const existingUser = await User.findOne({ email });
    const founders = [process.env.jack, process.env.chris, process.env.blaze]
    
    if (!existingUser) {
      throw new Error("Account with that email does not exist");
    }
    
    if(!founders.includes(existingUser.email)){
      throw new Error("You are not authorized for this area.");
    }
    

    
    
    
    
    if (!isValid) {
      throw new Error(message);
    }

    
    

    

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      throw new Error("Incorrect password");
    } else {
      // const token = jwt.sign({ id: existingUser.uid }, secretOrKey);
      return true;
    }
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  const { uid } = data;
  const user = User.findOne({ uid });
  const token = null;
  user.token = token;
  (await user).updateOne();

  return { loggedIn: false, _id: uid, token };
};

const verifyUser = async data => {
  try {
    // take in the token from the mutation
    const { token } = data;
    // decode the token using our secret password to get the user's id
    const decoded = jwt.verify(token, secretOrKey);
    const { id } = decoded;
    
    const loggedIn = await User.findOne({uid: id}).then(user => {
      return user ? true : false;
    });

    return { loggedIn, _id: id, token };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, logout, login, verifyUser, admin };