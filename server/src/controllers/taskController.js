import Task from '../models/Task.js'
import Project from '../models/Project.js'

export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, assignedTo, priority, status } = req.body;
        // check if user has access to the project
        const project = await Project.findOne({
            _id: projectId,
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        });
        if (!project) {
            return res.status(403).json({ message: 'access to this project was denied.' });
        }

        const task = await Task.create({
            title,
            description,
            status,
            projectId,
            assignedTo,
            createdBy: req.user.id,
            priority
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        // verify access
        const project = await Project.findOne({
            _id: projectId,
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        });
        if (!project) {
            return res.status(403).json({ message: 'No access to this project' });
        }

        const tasks = await Task.find({ projectId }).populate('assignedTo', 'username email').populate('createdBy', 'username email');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMyTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ assignedTo: req.user.id, projectId }).populate('createdBy', 'username email');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // only creator or project owner can edit
        const project = await Project.findOne({
            _id: task.projectId,
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        });
        if (!project) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const project = await Project.findOne({
            _id: task.projectId,
            owner: req.user.id
        });
        if (!project) {
            return res.status(403).json({ message: 'Only owner can delete task' });
        }
        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
