import axios from 'axios';
import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from '@tanstack/react-router';

type Tokens = {
    access: string
    refresh: string
}

const LoginForm = () => {
    const [, setCookie] = useCookies(['tokens']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin(token: object) {
        setCookie('tokens', token, {path: '/'})
        navigate({to: '/dashboard'});
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        axios.post('http://localhost:8000/api/token/', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const tokens: Tokens = response.data;
            handleLogin(tokens);
        })
        .catch(err => console.log(err))
    }

  return (
    <form className='flex flex-col gap-3 m-4' onSubmit={handleSubmit}>
        <TextField type='text' value={username} onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined"/>
        <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined"/>
        <Button type="submit" variant='outlined'>Submit</Button>
    </form>
  )
}

export default LoginForm;