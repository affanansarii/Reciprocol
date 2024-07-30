
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import ProjectForm from './ProjectForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = () => {
    const navigate = useNavigate();
    const { projects, getProjects, deleteProject } = useContext(ProjectContext);
    const { logout, token } = useContext(AuthContext);
    const [projectToEdit, setProjectToEdit] = useState(null);

    const logoutAndRedirect = () => {
        logout();
        if (!token) {
            navigate('/')
        }
    }
    const goToTask = (project) => {
        navigate(`/task/${project._id}`)
    }
    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className='project-list'>
            <div>
                <button onClick={logoutAndRedirect}>
                    Logout
                </button>
            </div>
            <h2>Projects</h2>
            <ProjectForm projectToEdit={projectToEdit} setProjectToEdit={setProjectToEdit} />
            <ul>
                {projects.map(project => (
                    <li key={project._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                            <button onClick={() => goToTask(project)}>View</button>
                            <button onClick={() => setProjectToEdit(project)}>Edit</button>
                            <button onClick={() => { console.log('project id to delete', project._id); deleteProject(project._id) }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;