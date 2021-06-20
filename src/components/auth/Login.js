import React, { Fragment, useContext, useState } from 'react';
import Header from '../layout/Header';
import { useHistory } from 'react-router-dom';
import validateLogin from '../../helpers/validateLogin';
import Swal from 'sweetalert2';
import Spinner from '../Spinner';
import { PrincipalContext } from '../../context';
import axiosClient from '../../config/axios';

const Login = () => {
    const history = useHistory();
    const [dataLogin, setDataLogin] = useState({
        "email": "",
        "password": ""
    });
    const {spinner, setSpinner, setOpacity} = useContext(PrincipalContext);
    const {email, password} = dataLogin;


    const submitRegister = () => {
        history.push('/register');
    }

    const submitLogin = async(e) => {
        e.preventDefault();
        const validate = await validateLogin(dataLogin);
        
        if(Object.keys(validate).length === 0){
            setSpinner(true);
            setOpacity.classList.add("opacity");
            
            try{
                let requestDataBase = await axiosClient.post("/login", dataLogin)

                if(requestDataBase.data.status === 404 || requestDataBase.data.status === 405){
                    setOpacity.classList.remove("opacity");
                    setSpinner(false);
                    Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: requestDataBase.data.message,
                        confirmButtonText: 'Aceptar'
                    })

                    return
                }
                setTimeout(() => {
                    setOpacity.classList.remove("opacity");
                    setSpinner(false);
                    localStorage.setItem("name",requestDataBase.data.name);
                    localStorage.setItem("email", email);
                    history.push('/agenda');
                },2000)

            }catch (error) {
                console.log(error)
            }

            return



            

        }   

        if(validate.email && validate.password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'Todos los datos son obligatorios',
                confirmButtonText: 'Aceptar'
                
            })

            return;
        }

        if(validate.email){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: validate.email,
                confirmButtonText: 'Aceptar'
                
            })
        }

        if(validate.password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'El password es obligatorio',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    const changeInput = (e) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value
        })
    }


    return(
        <Fragment>
            <Header/>
            {spinner ? <Spinner/> : null}
            <section className="login">
                <div className="login__form">
                    <form>
                        <div className="login__form__text">
                            <h1>Iniciar Sesión</h1>
                            <p>
                                Crea contactos en nuestra plataforma online
                                con las mejores herramientas.
                            </p>
                        </div>
                        <div className="login__form__form">
                            <label>Correo electrónico</label>
                            <input 
                                type="email" 
                                placeholder="Ingresa tu Correo" 
                                className="input-principal"
                                name="email"
                                onChange={changeInput}
                                value={email}
                            />
                            <label>Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Ingresa tu Contraseña" 
                                className="input-principal"
                                name="password"
                                onChange={changeInput}
                                value={password}
                            />
                            <button className="input-principal btn-login" onClick={submitLogin}>Iniciar Sesión</button>
                            <button className="input-principal btn-register" onClick={submitRegister}>Registrarse</button>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}


export default Login;