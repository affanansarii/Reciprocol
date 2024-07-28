const express = require('express');
const { protect, admin } = require('../middlewares/authMiddlewares');

const {
    getTasks,
    updateTask,
    deleteTask,
    createTasks,
} = require('../controllers/taskController');

const router = express.Router();

router.route('/:projectId').get(protect, getTasks).post(protect, createTasks);
router.route('/:taskId').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
