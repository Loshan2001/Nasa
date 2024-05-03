import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/Login.scss';
import {useForm} from 'react-hook-form'
import Swal from 'sweetalert2';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
    
    const navigate = useNavigate();
    const onSubmits=(data)=>{
        const loginData = {
            email : data.email,
            password : data.password
        }
        const name = loginData.email.split("@")[0];
        axios.post('http://localhost:8080/api/user/login',loginData).then((res)=>{
            if(res.data.error) {
                // alert(res.data.error)
                Swal.fire({
                  icon: 'error',
                  title: res.data.error,
                  text: 'The provided email/password was not found. Please check and try again.',
                });
            }else{
            sessionStorage.setItem('token',res.data)
            sessionStorage.setItem('name',name)
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'Welcome',
            });
            navigate('/')
            }
             
    })
    }
    const schema = yup.object().shape({
         
        email : yup.string().email().required(),
        password : yup.string().max(50).min(8).required(),
        checked: yup.boolean().oneOf([true], 'Please accept the terms and conditions').required(),
    })
    const {register , handleSubmit ,formState : {errors}} = useForm({
        resolver : yupResolver(schema),

    });
    
    
  

  return (
    <div className='login template d-flex justify-content-center align-item-center  '>
      <div className='form_container'>
        <form action='' onSubmit={handleSubmit(onSubmits)}>
          <h3 className='text-center'>Sign In</h3>
          <div className='mb-4'>
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Enter Email' className='form-control' {...register('email')}/>
            <span style={{color : 'red',fontSize: '0.9rem'}}>{errors.email?.message}</span>
          </div>
          <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Enter password' className='form-control' {...register('password')}/>
            <span style={{color : 'red',fontSize: '0.9rem'}}>{errors.password?.message}</span>
          </div>
          <div className='mb-2'>
            <input type='checkbox' className='custom-control custom-checkbox' id='check' {...register('checked')} />
            <label htmlFor='check' className='custom-input-label ms-2'>
             accept terms and conditions
            </label>
          </div>
            <span style={{color : 'red',fontSize: '0.9rem'}}>{errors.checked?.message}</span>
          <div className='d-grid'>
            <button className='btn btn-primary'>Sign In</button>
          </div>
          <p className='text-end mt-2'>
            Forgot <Link to=''>password?</Link>
            <Link to='/signup' className='ms-2'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
