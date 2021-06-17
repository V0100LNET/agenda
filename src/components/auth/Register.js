import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../layout/Header';


const Register = () => {
    const history = useHistory();

    const submitLogin = () => {
        history.push('/login');
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
                            <input type="email" placeholder="Ingresa tu Correo" className="input-principal"/>
                            <label>Contraseña</label>
                            <input type="password" placeholder="Ingresa tu Contraseña" className="input-principal"/>
                            <label>Repite tu Contraseña</label>
                            <input type="password" placeholder="Repite tu Contraseña" className="input-principal"/>
                            <button className="input-principal btn-register">Registrarse</button>
                            <button className="input-principal btn-login" onClick={submitLogin}>Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}


export default Register;