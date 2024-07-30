import React, { useState, useContext, useEffect } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import './TaskForm.css';

const TaskForm = ({ projectId, taskToEdit, setTaskToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        status: 'To Do',
    });

    const { addTask, updateTask } = useContext(ProjectContext);

    useEffect(() => {
        if (taskToEdit) {
            setFormData(taskToEdit);
        } else {
            setFormData({ title: '', status: 'To Do' });
        }
    }, [taskToEdit]);

    const { title, status } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (taskToEdit) {
            updateTask(taskToEdit._id, formData);
        } else {
            addTask(projectId, formData);
        }
        setTaskToEdit(null);
        setFormData({ title: '', status: 'To Do' });
    };

    return (

        <div className='task-form'>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={title}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select name='status' value={status} onChange={onChange}>
                        <option value='To Do'>To Do</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Done'>Done</option>
                    </select>
                </div>
                <button type='submit'>{taskToEdit ? 'Update' : 'Add'} Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
