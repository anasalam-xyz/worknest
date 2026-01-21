import Project from '../models/Project.js'
import mongoose from 'mongoose'

export const getUserProjects = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const projects = await Project.aggregate([
            {
                $match: {
                    $or: [
                        { owner: userId },
                        { members: userId }
                    ]
                }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "tasks"
                }
            },
            {
                $addFields: {
                    progress: {
                        $cond: [
                            { $eq: [{ $size: "$tasks" }, 0] },
                            0,
                            {
                                $round: [
                                    {
                                        $multiply: [
                                            {
                                                $divide: [
                                                    {
                                                        $size: {
                                                            $filter: {
                                                                input: "$tasks",
                                                                as: "t",
                                                                cond: { $eq: ["$$t.status", "completed"] }
                                                            }
                                                        }
                                                    },
                                                    { $size: "$tasks" }
                                                ]
                                            },
                                            100
                                        ]
                                    },
                                    0
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    tasks: 0,
                    passkey: 0
                }
            }
        ]);

        res.json(projects);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        }).populate('owner members', 'username email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found or access denied' });
        }
        res.json(project);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
export const createProject = async (req, res) => {
    try {
        const { name, description, code, passkey } = req.body;
        const project = await Project.create({
            name,
            description,
            code,
            passkey,
            owner: req.user.id,
            members: []
        });
        res.status(201).json(project);
    } catch (e) {
        if (e.code === 11000) {
            return res.status(400).json({ message: 'Project code already exists' });
        }
        res.status(500).json({ error: e.message });
    }
}
export const joinProject = async (req, res) => {
    try {
        const { code, passkey } = req.body;
        const project = await Project.findOne({ code });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (project.passkey !== passkey) {
            return res.status(401).json({ message: 'Invalid passkey' });
        }
        // already owner or member
        if (project.owner.toString() === req.user.id || project.members.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already part of this project' });
        }
        project.members.push(req.user.id);
        await project.save();
        res.json({ message: 'Joined project successfully', project });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            req.body,
            { new: true }
        );
        if (!project) {
            return res.status(403).json({ message: 'Not authorized or project not found' });
        }
        res.json(project);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });
        if (!project) {
            return res.status(403).json({ message: 'Not authorized or project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}