import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import validateRegister from '../../helpers/validateRegister';
import Header from '../layout/Header';


const Register = () => {
    const history = useHistory();
    const [dataRegister, setDataRegister] = useState({
        "email": "",
        "password": "",
        "repeat_password": "",
    })
    const {email, password, repeat_password} = dataRegister;

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
                text: validate.password,
                confirmButtonText: 'Aceptar'
            })
        }

        if(validate.repeat_password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: validate.repeat_password,
                confirmButtonText: 'Aceptar'
            })
        }

        if(validate.equals_password){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: validate.equals_password,
                confirmButtonText: 'Aceptar'
            })
        }

        console.log(dataRegister);
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