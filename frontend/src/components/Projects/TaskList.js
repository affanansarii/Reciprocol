import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import TaskForm from './TaskForm';
import { useNavigate, useParams } from 'react-router-dom';

const TaskList = () => {
    const navigate = useNavigate();
    const { tasks, getProjectTasks, deleteTask } = useContext(ProjectContext);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const { projectId } = useParams()

    console.log('projectId', projectId);
    useEffect(() => {
        getProjectTasks(projectId);
    }, [projectId]);

    // const project = projects.find(project => project._id === projectId);
    // const tasks = project ? project.tasks : [];

    return (
        <div>
            <h2>Tasks</h2>
            <div>
                <button onClick={() => navigate('/projects')}>
                    Go to Projects
                </button>
            </div>
            <TaskForm projectId={projectId} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />

            <ul>
                {tasks.map(task => (
                    <div >
                        <li key={task._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <h3>{task.title}</h3>
                            <p>{task.status}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                                <button onClick={() => setTaskToEdit(task)}>Edit</button>
                                <button onClick={() => deleteTask(task._id)}>Delete</button>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
