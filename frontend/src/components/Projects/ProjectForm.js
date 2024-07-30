import React, { useState, useContext, useEffect } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import './ProjectForm.css';

const ProjectForm = ({ projectToEdit, setProjectToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const { addProject, updateProject } = useContext(ProjectContext);

    useEffect(() => {
        if (projectToEdit) {
            setFormData(projectToEdit);
        } else {
            setFormData({ title: '', description: '' });
        }
    }, [projectToEdit]);

    const { title, description } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (projectToEdit) {
            updateProject(formData);
        } else {
            addProject(formData);
        }
        setProjectToEdit(null);
        setFormData({ title: '', description: '' });
    };

    return (

        <div className='project-form'>
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
                    <label>Description</label>
                    <textarea
                        name='description'
                        value={description}
                        onChange={onChange}
                    ></textarea>
                </div>
                <button type='submit'>{projectToEdit ? 'Update' : 'Add'} Project</button>
            </form>
        </div>
    );
};

export default ProjectForm;