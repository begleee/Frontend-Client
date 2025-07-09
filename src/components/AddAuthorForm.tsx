import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { TextField, Button, Card } from "@mui/material"
import { nofaceImage } from "../assets/nofaceImage";
import { useNavigate } from "@tanstack/react-router";

const AddAuthorForm = () => {
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
    <form className="flex flex-col gap-3 m-3">
        <TextField type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} label="Author name" variant="outlined"/>
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
        <Card variant="outlined" className="flex flex-row gap-2 p-2 border">
            <div className="w-20 h-20 overflow-hidden rounded">
                <img className="w-full h-full object-cover rounded" src={imgUrl || './'} alt="" />
            </div>
            <div className="flex flex-col">
                <p className="font-bold">{fullName || "Author name"}</p>
                <p>0 songs</p>
            </div>
        </Card>
    </form>
  )
}

export default AddAuthorForm