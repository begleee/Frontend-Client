import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { TextField, Button } from "@mui/material"
import { nofaceImage } from "../assets/nofaceImage";
import { useNavigate } from "@tanstack/react-router";

const AddSingerForm = () => {
    const [cookies, setCookie, removeCookies] = useCookies(['tokens'])
    const accessToken = cookies.tokens?.access
    const refreshToken = cookies.tokens?.refresh

    const [fullName, setFullName] = useState('')
    const [photo, setPhoto] = useState<File>(nofaceImage)
    const [imgUrl, setImgUrl] = useState<string>();
    const navigate = useNavigate();

    const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file) {
            setPhoto(file)
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('full_name', fullName);
        if (photo) {
            formData.append('image', photo);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/singer/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            console.log(response.data);
        }
        catch(err) {
            if(err === 401) {
                const response = await axios.post('http://localhost:8000/api/token/refresh/',
                    {
                        'refresh': refreshToken
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const newAccess = response.data.access
                const tokens = {
                    access: newAccess,
                    refresh: refreshToken
                }
                setCookie('tokens', tokens, {path: '/'})
                handleSubmit(e)
            }
            console.log(err)
        }
        
    }

    useEffect(() => {
        if(photo) {
            const url = URL.createObjectURL(photo);
            setImgUrl(url);

            return () => URL.revokeObjectURL(url);
        }
    },[photo])

  return (
    <form className="flex flex-col gap-3 m-4">
        <TextField type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} label="Singer Name" variant="outlined"/>
        <Button variant="contained" component="label">
            Upload a photo
            <input onChange={onChangePhoto} type="file" hidden/>
        </Button>
        
        <Button onClick={handleSubmit} type="submit" variant='outlined'>Post</Button>
        <Button onClick={() => {
                removeCookies('tokens')
                navigate({to: '/'})
            }}
            variant="outlined" type="button">
                Logout
        </Button>
        <img width={200} src={imgUrl || './'} alt="" />
    </form>
  )
}

export default AddSingerForm