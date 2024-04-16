const expressAsyncHandler = require("express-async-handler");
const Task = require("../models/task");

//create task
const createtaskCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      status: req.body.status,
    });
    res.json(task);
  } catch (error) {
    res.json(error);
  }
});
//get all tasks

const fetchtaskCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const task = await Task.find({});
    res.json(task);
  } catch (error) {
    res.json(error);
  }
});

const fetchdonetaskCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const task = await Task.find({status:req.body.status});
    res.json(task);
  } catch (error) {
    res.json(error);
  }
});


const updatetaskCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task status
    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status updated successfully', task });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

});


const fetchSingleTaskCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const taskId = req.params.id;
      
      const task = await Task.findById(taskId);
      
      // Check  the task exists
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  // Delete task 
const deleteTaskCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
module.exports = {
  createtaskCtrl,
  fetchtaskCtrl,fetchSingleTaskCtrl,deleteTaskCtrl,fetchdonetaskCtrl,updatetaskCtrl
};
