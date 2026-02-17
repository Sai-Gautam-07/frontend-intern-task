const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{
  const hashed = await bcrypt.hash(req.body.password,10);
  const user = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:hashed
  });
  res.json(user);
};

exports.login = async(req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(req.body.password,user.password);
  if(!match) return res.status(400).send("Wrong password");

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({token});
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

exports.updateProfile = async (req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      name:req.body.name,
      email:req.body.email
    },
    { new:true }
  ).select("-password");

  res.json(user);
};
