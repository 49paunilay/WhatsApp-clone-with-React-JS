import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import './login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
const Login=()=>{
    const [{},dispatch] = useStateValue();
    const signin=()=>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        }).catch((error)=>alert(error.message))
    }
    return(
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt=" not loaded"/>
                <div className="login_text">
                    <h1>Sign In to WhatsApp</h1>
                </div>
                <Button onClick={signin}>Sign In</Button>
            </div>
        </div>
    )
}
export default Login;