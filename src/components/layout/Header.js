import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from "./logo.png"

const Header = () => {
    const history = useHistory();
    
    const submitLogin = () => {
        history.push('/login');
    }

    const submitRegister = () => {
        history.push('/register');
    }


    return(
        <header>
            <div className="content-header">
                <div className="content-header__logo">
                    <a href="/"><img className="__logo" src={logo} alt="logo"/></a>
                </div>
                <nav className="content-header__links">
                    <a href="/#">Contacto</a>
                    <a href="/#">Acerca de</a>
                    <a href="/#">Proyectos</a>
                </nav>
                <div className="content-header__buttons">
                    <button className="__login btn-principal" onClick={submitLogin}>Iniciar Sesión</button>
                    <button className="__register btn-principal" onClick={submitRegister} >Registrarse</button>
                    <a href="/#"><i className="fas fa-bars"></i></a>
                </div>
            </div>
        </header>
    )
}


export default Header;