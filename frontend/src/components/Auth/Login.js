import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login, user, token } = useContext(AuthContext);

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);

    };

    useEffect(() => {
        console.log('userState', user);
        if (token) {
            navigate('/projects')
        }
    }, [user])

    const register = () => {
        navigate('/register');
    }

    return (
        <>
            <div>{user ? 'Logged in' : 'not logged in'}</div>
            <form onSubmit={onSubmit}>
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
                <button type='submit'>Login</button>
                <div>
                    <h2>Don't have an account?</h2>
                    <button onClick={register}>Register</button>

                </div>
            </form>
        </>
    );
};

export default Login;
