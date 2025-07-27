const Task = require('../models/Task.model.js');

module.exports.getAllTasks = async (req, res) => {
    try {
        const { status, priority, sortBy = 'dueDate', order = 'asc', page = 1, limit = 10 } = req.query;

        const query = {};
        if (status) query.status = status;
        if (priority) query.priority = priority;

        const sortOrder = order === 'desc' ? -1 : 1;

        const skip = (Number(page) - 1) * Number(limit);

        const tasks = await Task.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .populate('assignedTo managedBy', 'name email'); 

        const totalTasks = await Task.countDocuments(query);

        res.status(200).json({
            data: tasks,
            total: totalTasks,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(totalTasks / limit),
        });
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error"});
    }
}

module.exports.getTaskById = async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found"});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
}


module.exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {  
        console.log("Error creating task: ", error.message); 
        res.status(500).json({ message: "Internal Server Error"});
    }
}

module.exports.updateTaskById = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
}

module.exports.deleteTaskById = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(204).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
}

