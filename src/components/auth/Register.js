import React, { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import { PrincipalContext } from '../../context';
import validateRegister from '../../helpers/validateRegister';
import Header from '../layout/Header';


const Register = () => {
    const history = useHistory();
    const {setOpacity, setSpinner} = useContext(PrincipalContext);
    const [dataRegister, setDataRegister] = useState({
        "name": "",
        "email": "",
        "password": "",
        "repeat_password": "",
    })
    const {email, password, repeat_password, name} = dataRegister;

    const submitLogin = () => {
        history.push('/login');
    }

    const changeData = (e) => {
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value
        })
    }

    const submitRegister = async(e) => {
        e.preventDefault();
        const validate = await validateRegister(dataRegister);

        if(validate.email && validate.password && validate.repeat_password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'Todos los datos son obligatorios',
                confirmButtonText: 'Aceptar'
            })

            return;
        }

        if(validate.name){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: validate.name,
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
            return;
        }

        if(validate.password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: validate.password,
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        if(validate.repeat_password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: validate.repeat_password,
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        if(validate.equals_password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: validate.equals_password,
                confirmButtonText: 'Aceptar'
            })
            return;
        }
        
        try{
            setOpacity.classList.add("opacity");
            setSpinner(true);
            let responseDataBase = await axiosClient.post('/register', dataRegister);
            if(responseDataBase.data.status === 405){
                Swal.fire({
                    icon: 'error',
                    title: '¡ERROR!',
                    text: responseDataBase.data.message,
                    confirmButtonText: 'Aceptar'
                })
                setSpinner(false);
                setOpacity.classList.remove("opacity");
                return
            }

            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro Exitoso!',
                    confirmButtonText: 'Aceptar'
                })
                setSpinner(false);
                setOpacity.classList.remove("opacity");
                setDataRegister({
                    "name": "",
                    "email": "",
                    "password": "",
                    "repeat_password": "",
                })
            },1000)
        }catch (error) {
            console.log(error)   
        }
    }

    return(
        <Fragment>
            <Header/>

            <section className="register">
                <div className="register__form">
                    <form>
                        <div className="register__form__text">
                            <h1>Registrarse</h1>
                            <p>
                                Registrate con nosotros para disfrutar al máximo
                                todas las herramientas de contacto.
                            </p>
                        </div>
                        <div className="register__form__form">
                        <label>Nombre</label>
                            <input 
                                type="text" 
                                placeholder="Ingresa tu primer nombre" 
                                className="input-principal"
                                name="name"
                                value={name}
                                onChange={changeData}
                            />
                            <label>Correo electrónico</label>
                            <input 
                                type="email" 
                                placeholder="Ingresa tu Correo" 
                                className="input-principal"
                                name="email"
                                value={email}
                                onChange={changeData}
                            />
                            <label>Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Ingresa tu Contraseña" 
                                className="input-principal"
                                name="password"
                                value={password}
                                onChange={changeData}
                            />
                            <label>Repite tu Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Repite tu Contraseña" 
                                className="input-principal"
                                name="repeat_password"
                                value={repeat_password}
                                onChange={changeData}
                            />
                            <button className="input-principal btn-register" onClick={submitRegister}>Registrarse</button>
                            <button className="input-principal btn-login" onClick={submitLogin}>Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}


export default Register;