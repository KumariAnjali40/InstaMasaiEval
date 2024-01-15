const express=require('express');

const {UserModel}=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userRouter=express.Router();

//