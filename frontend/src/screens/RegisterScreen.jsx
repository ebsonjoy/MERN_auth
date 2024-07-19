import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlices";
import { setCredentials } from "../slices/authSlice";



const RegisterScreen = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state)=>state.auth)
    const [register, {isLoading}] = useRegisterMutation();
    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate, userInfo])




    const submitHandler = async(e)=>{
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const nameRegex = /^[A-Za-z\s'-]+$/;
        if (!name || !email || !password || !confirmPassword) {
            toast.error('All fields are required');
            return;
          }
        if (!name) {
            toast.error('Name is required');
            return;
        }
        if (!nameRegex.test(name)) {
            toast.error('Name is not valid');
            return;
        }
        if (!email) {
            toast.error('Email is required');
            return;
        }
        if (!emailRegex.test(email)) {
            toast.error('Email is not valid');
            return;
        }
        if (!password) {
            toast.error('Password is required');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
            try {
            const res = await register({name,email , password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')  
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        
    }
  return (      
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className ='my-2' controlId ='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder = 'Enter Name'
                value = {name}
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>


            <Form.Group className ='my-2' controlId ='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder = 'Enter Email'
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className ='my-2' controlId ='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder = 'Enter Password'
                value = {password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className ='my-2' controlId ='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type='password'
                placeholder = 'Confirm Password'
                value = {confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            {isLoading && <Loader/>}
            <Button type = 'submit' variant = 'primary' className = 'mt-3'>
                Sign Up
            </Button>
            <Row className = 'py-3'>
                <Col>
                Alrady have an account ? <Link to = '/login'>Sign In</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen