const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found!'});
        }
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description, user: req.userId });
        res.status(201).json(task)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
    );
    if (!task) {
        return res.status(404).json({ message: 'Task not found!' });
    }
    res.status(200).json(task);
};

exports.deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) {
        return res.status(404).json({ message: 'Task not found!' });
    }
    res.status(200).json({ message: 'Task deleted!' });
};