import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import { useState,useEffect } from 'react';
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from 'react-router-dom';
import './Chat.css';
import db from './firebase'; 
import { useStateValue } from './StateProvider';
import firebase from "firebase";
const Chat=()=>{
    const [seed,setSeed] = useState("")
    const [input,setInput] = useState("")
    const {roomid} = useParams();
    const [roomname,setRoomname] = useState("")
    const [messages,setMessage] = useState([])
    const [{user},dispatch] = useStateValue()
    useEffect(()=>{
        if(roomid){
            db.collection('rooms').doc(roomid).onSnapshot(snapshot=>{
                setRoomname(snapshot.data()?snapshot.data().name:"Undefined")
                console.log(snapshot.data())

            })
            db.collection('rooms').doc(roomid).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>{
                setMessage(snapshot.docs.map((doc)=>{
                    return doc.data()
                }))
            })
        }
    },[roomid])
   

    console.log(messages);


    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [roomid]);
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomid).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomname}</h3>
                    <p>Last seen server time { new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}</p>
                </div>
                <div className="chatheaderRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton><AttachFile/></IconButton>
                    <IconButton><MoreVert/></IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message)=>{
                    return(
                        <p className={`chat_message ${message.name===user.displayName && "chat_receiver"}`}>
                        <span className="chat_name">{message.name}</span>
                            { message.message }
                        <span className="chat_timestamp">
                            {
                                new Date(message.timestamp?.toDate()).toUTCString()
                            }
                        </span>
                        </p>
                    )
                })}
            </div>

            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}
export default Chat;