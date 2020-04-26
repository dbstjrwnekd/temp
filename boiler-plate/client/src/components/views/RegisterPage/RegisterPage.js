import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action';

function RegisterPage(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setComfirmPassword] = useState("");
    const [Name, setName] = useState("");

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onNameHandler = (event) =>{
        setName(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) =>{
        setComfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (evnet) => {
        evnet.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치하지 않습니다');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
            confirmpassword: ConfirmPassword
        }

        dispatch(registerUser(body))
            .then(res=>{
                if(res.payload.success){
                    props.history.push('/login');
                }else{
                    alert('fail to sign up');
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
                <label>Name</label>
                <input type='text' value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler} />
                <label>Password</label>
                <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;