const Task = require("../models/Task");

exports.createTask = async (req,res)=>{
  const task = await Task.create({
    title: req.body.title,
    userId: req.userId
  });
  res.json(task);
};

exports.getTasks = async (req,res)=>{
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

exports.deleteTask = async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
};

exports.updateTask = async (req,res)=>{
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new:true }
  );
  res.json(task);
};
