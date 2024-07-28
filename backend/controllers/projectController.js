const Project = require('../models/Project');

exports.getProjects = async (req, res) => {

    const projects = await Project.find({ user: req.user._id });
    res.json(projects);

};

exports.createProject = async (req, res) => {

    const { title, description } = req.body;

    const project = new Project({
        title,
        description,
        user: req.user._id,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);

};

exports.updateProject = async (req, res) => {

    const { title, description } = req.body;

    const project = await Project.findById(req.params.id);

    if (project && project.user.toString() === req.user._id.toString()) {

        project.title = title;
        project.description = description;

        const updatedProject = await project.save();
        res.json(updatedProject);

    } else {
        res.status(404).json({ message: 'Project not found' });
    }

};

exports.deleteProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (project && project.user.toString() === req.user._id.toString()) {
            // console.log('Project id to delete', req.params.id)
            // console.log('Project', project)
            await Project.findOneAndDelete({ _id: req.params.id });
            res.json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }

}