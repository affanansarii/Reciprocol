const Task = require('../models/Task');
const Project = require('../models/Project');

exports.getTasks = async (req, res) => {

    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);

};

exports.createTasks = async (req, res) => {

    const { title, status } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (project) {

        const task = new Task({
            title,
            status,
            project: req.params.taskId,
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);

    } else {
        res.status(404).json({ message: 'Project not found' });
    }

};

exports.updateTask = async (req, res) => {
    try {

        const { title, status } = req.body;

        const task = await Task.findById(req.params.taskId);

        if (task) {
            task.title = title;
            task.status = status;

            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.log('error while deleting task')
        res.status(404).json({ message: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {

        const task = await Task.findById(req.params.taskId);

        if (task) {
            await Task.findOneAndDelete({ _id: req.params.taskId });
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.log('error while deleting task')
        res.status(404).json({ message: err.message });
    }
};