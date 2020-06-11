import React, { Component } from 'react';
import styled from 'styled-components'
import CustonInput from '../components/CustomInput'
import { withRouter } from 'react-router';
export const LoginWrapper = styled.div`
  position: absolute;
    top: -70px;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner-wrpper {
        display: flex;
        flex-direction: column;
        width: 16%;
        min-width: 250px;
    }
   
`
export const LoginBtn = styled.span`
    display; inline-block;
    margin-top: 25px;
    width: 100%;
    background: red;
    border-radius: 5px;
    text-align: center;
    padding: 10px 0 ;
    opacity: ${props => props.active ? '0.5':'1'};
    color: white ;
    
   
`

class Login extends Component {

        constructor(props){
            super(props)
            this.state = {
                email: '',
                password: '',
                emailErr:false,
                passwordErr:false
            }
        }

        logIn = () =>{
            if(this.errFree()){
                this.props.history.push("/home");
            }
            
        }
     validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        onChange = e =>{
           
            this.setState({[e.target.name]: e.target.value},()=> {
                const {email, password } = this.state
                if(email.length && this.validateEmail(email)){
                    this.setState({emailErr: null})
                
                }else{
                    this.setState({emailErr: 'incorrect email'})
                }

                if(password.length && password.length > 5){
                    this.setState({passwordErr: null})
                }else{
                 
                    this.setState({passwordErr: 'password should be greater than 5'})
                }
            })

        }
        errFree = () =>{
            const {passwordErr, emailErr} = this.state
            if(passwordErr !== null  || emailErr !== null){
                return false
            }else{
                return true
            }
        }
    render() {

        const {email, password, emailErr, passwordErr } = this.state
        return (
            <LoginWrapper>
                <div className='inner-wrpper'>
                    <CustonInput type='email' error={emailErr} name='email' label='Email' value={email}  onChange={this.onChange} />
                    <CustonInput type={'password'} error={passwordErr} name='password' label='Password' value={password}  onChange={this.onChange} />
                    <LoginBtn active={!this.errFree()} onClick={()=> this.logIn()}>Login</LoginBtn>
                </div>
            </LoginWrapper>
        )
    }
}


export default withRouter(Login);