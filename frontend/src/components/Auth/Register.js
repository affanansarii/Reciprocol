import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { register, isRegistered } = useContext(AuthContext);

    const { name, email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        register(name, email, password);
        if (isRegistered) {
            navigate('/')
        }
    };

    const login = () => {
        navigate('/');
    }

    return (

        <div className='register-page'>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <button type='submit'>Register</button>

                <div>
                    <h2>Already have an account?</h2>
                    <button onClick={login}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
