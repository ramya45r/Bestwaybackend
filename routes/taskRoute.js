const express =require('express');
const { createtaskCtrl,fetchtaskCtrl,fetchSingleTaskCtrl,deleteTaskCtrl,fetchdonetaskCtrl,updatetaskCtrl} = require('../controller/taskController');


const taskRoute =express.Router();

taskRoute.post('/',createtaskCtrl);
taskRoute.get('/',fetchtaskCtrl);
taskRoute.post('/donetasks',fetchdonetaskCtrl);
taskRoute.put('/:id',updatetaskCtrl);

taskRoute.get('/:id',fetchSingleTaskCtrl);
taskRoute.delete('/:id',deleteTaskCtrl);

module.exports =taskRoute;