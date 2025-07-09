import { createFileRoute, redirect, useNavigate, Link, Outlet } from '@tanstack/react-router'
// import AddSingerForm from '../components/AddSingerForm'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

export const Route = createFileRoute('/home')({
    loader: () => {
        const hasToken = document.cookie.includes('tokens');
        if(!hasToken) {
            throw redirect({
                to: '/'
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const [cookie] = useCookies(['tokens']);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookie.tokens) {
            axios.post('http://localhost:8000/api/token/verify/',
            {
                token: cookie.tokens.access
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            ).then(response => {
                if (response.status !== 200) {
                    navigate({
                        to: '/'
                    })
                }
            }).catch(() => {
                navigate({
                    to: '/'
                })
            });
        }
        navigate({
            to: '/home/authors'
        })
    })

  return (
    <div className='flex flex-col'>
        <ul className="p-2 flex gap-2">
            <Link className="[&.active]:font-bold" to='/home/authors'>
                Authors
            </Link>
            <Link className="[&.active]:font-bold" to='/home/songs'>
                Songs
            </Link>
        </ul>
        <Outlet/>
    </div>
  )
}