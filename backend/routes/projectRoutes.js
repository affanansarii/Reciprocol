const express = require('express');
const { protect, admin } = require('../middlewares/authMiddlewares');
const {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

router.route('/').get(protect, getProjects).post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

module.exports = router;