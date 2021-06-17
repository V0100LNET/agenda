import React, { Fragment } from 'react';
import Header from '../layout/Header';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();

    const submitRegister = () => {
        history.push('/register');
    }

    const submitLogin = () => {
        
    }

    return(
        <Fragment>
            <Header/>
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
                            <input type="email" placeholder="Ingresa tu Correo" className="input-principal"/>
                            <label>Contraseña</label>
                            <input type="password" placeholder="Ingresa tu Contraseña" className="input-principal"/>
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