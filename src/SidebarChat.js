import { Avatar } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from './firebase';
import './Sidebarchat.css';
const SidebarChat=({id,name,addnewChat})=>{
    const [seed,setSeed]  = useState('');
    const [lastmessage,setLastmessage] = useState("")
    const createChat=()=>{
        const roomname = prompt("Enter a name for chat");
        if(roomname){
            db.collection('rooms').add({
                name:roomname,
            })
        }
    }
    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>(
                setLastmessage(snapshot.docs.map((doc)=>doc.data()))
            ))
        }
    },[id])
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))   
    },[])
    return !addnewChat?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebar_chat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarchat_info">
                <h2>{ name }</h2>
                <p>{lastmessage[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebar_chat">
            <h2>Add new Chat</h2>
        </div>
    )
}
export default SidebarChat;