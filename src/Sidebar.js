import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useState,useEffect } from 'react';
import { useStateValue } from './StateProvider';


const Sidebar=()=>{
    const [room,setRooms] = useState([])
    const [{user},dispatch] = useStateValue()
    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    data:doc.data(),
                }
            )))
        ))
    },[])
    return(
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_rightheader">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_Searchcontainer">
                    <SearchIcon/>
                    <input placeholder="start new Chat"></input>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addnewChat/>
                {
                    room.map((room)=>{
                        return(
                            <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Sidebar;