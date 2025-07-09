import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

interface Singer {
    id: number;
    full_name: string;
    image: string;
    songs_count: number
}

const Authors = () => {
    const [cookie] = useCookies(['tokens']);
    const [singers, setSingers] = useState<Singer[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/singer/',
            {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${cookie.tokens.access}`
                }
            }
        ).then(response => {
            setSingers(response.data.results || []);
        })
    },[cookie])

    console.log(singers);

    return <>
        <div className="flex flex-col gap-3 m-3">
            {
                singers.map((singer) => (
                    <Card variant="outlined" className="flex flex-row gap-2 p-2 border" key={singer.id}>
                        <div className="w-20 h-20 overflow-hidden rounded">
                            <img className="w-full h-full object-cover rounded" src={singer.image} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">{singer.full_name}</p>
                            <p>{singer.songs_count} songs</p>
                        </div>
                    </Card>
                ))
            }
        </div>
    </>
}

export default Authors