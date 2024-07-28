import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

const initialState = {
    projects: [],
    tasks: []
};

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.payload,
            };
        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [...state.projects, action.payload],
            };
        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map(project =>
                    project._id === action.payload._id ? action.payload : project
                ),
            };
        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
            };
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload,
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                ),
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
            };
        default:
            return state;
    }
};

const apiUrl = 'http://localhost:5000';

const ProjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    const getProjects = async () => {
        const res = await axios.get(`${apiUrl}/api/projects`);
        dispatch({
            type: 'SET_PROJECTS',
            payload: res.data,
        });
    };

    const addProject = async project => {
        const res = await axios.post(`${apiUrl}/api/projects`, project);
        dispatch({
            type: 'ADD_PROJECT',
            payload: res.data,
        });
    };

    const updateProject = async project => {
        const res = await axios.put(`${apiUrl}/api/projects/${project._id}`, project);
        dispatch({
            type: 'UPDATE_PROJECT',
            payload: res.data,
        });
    };

    const deleteProject = async id => {
        console.log('id to delete', id)
        await axios.delete(`${apiUrl}/api/projects/${id}`);
        dispatch({
            type: 'DELETE_PROJECT',
            payload: id,
        });
    };

    const getProjectTasks = async (id) => {
        const res = await axios.get(`${apiUrl}/api/tasks/${id}`);
        dispatch({
            type: 'SET_TASKS',
            payload: res.data,
        });
    };

    const addTask = async (projId, data) => {
        const res = await axios.post(`${apiUrl}/api/tasks/${projId}`, { title: data.title, status: data.status });
        dispatch({
            type: 'ADD_TASK',
            payload: res.data,
        });
    };

    const deleteTask = async id => {
        console.log('id to delete', id)
        await axios.delete(`${apiUrl}/api/tasks/${id}`);
        dispatch({
            type: 'DELETE_TASK',
            payload: id,
        });
    };

    const updateTask = async (projectId, data) => {
        const res = await axios.put(`${apiUrl}/api/tasks/${projectId}`, data);
        dispatch({
            type: 'UPDATE_TASK',
            payload: res.data,
        });
    };

    return (
        <ProjectContext.Provider
            value={{
                ...state,
                getProjects,
                addProject,
                updateProject,
                deleteProject,
                getProjectTasks,
                addTask,
                deleteTask,
                updateTask
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export { ProjectContext, ProjectProvider };
