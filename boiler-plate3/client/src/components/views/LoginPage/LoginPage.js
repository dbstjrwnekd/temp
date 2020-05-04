import React, { useState } from 'react'
import axios from 'axios';

function LoginPage(props){
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (evnet) => {
        evnet.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        axios.post('/api/users/login',body)
        .then(res =>{
            if(res.data.loginSuccess){
                props.history.push('/');
            }else{
                alert(res.data.message);
            }
        });
                
    }

    return(
        <div style = {{
            display:'flex', justifyContent: 'center', alignItems:'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;