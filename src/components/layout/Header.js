import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import logo_login from "../../assets/img/logo-Ekomercio.png"
import { PrincipalContext } from '../../context';
import { Link } from 'react-router-dom';

const Header = () => {
    const setOpacity = document.body;
    const {setSpinner} = useContext(PrincipalContext);
    const history = useHistory();
    const user_localStorage = localStorage.getItem("name");
    
    const submitLogin = () => {
        history.push('/login');
        setOpacity.classList.remove("set-over-flow")
    }

    const submitRegister = () => {
        history.push('/register');
        setOpacity.classList.remove("set-over-flow")
    }

    const goToAgenda = () => {
        history.push('/agenda');
        setOpacity.classList.remove("set-over-flow")
    }

    const closeSession = () => {
        setSpinner(true);
        setOpacity.classList.add("opacity");
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        setTimeout(() => {
            setSpinner(false);
            setOpacity.classList.remove("opacity");
            setOpacity.classList.remove("set-over-flow")
            history.push('/');
        },2000)
    }

    const onClickShowMenu = () => {
        const check_localstorage = localStorage.getItem("email");
        const show_menu = document.querySelector(".content-header__links");
        const btn_saludo = document.querySelector(".btn-saludo");
        const btn_login = document.querySelector(".__login");
        const btn_register = document.querySelector(".__register");
        const size_window = window.innerWidth
        
        show_menu.classList.toggle("show-menu");
        setOpacity.classList.toggle("set-over-flow")

        if(check_localstorage && size_window <= 600){
            btn_login.classList.toggle("show-btn");
            btn_saludo.classList.toggle("show-btn");
        }
        
        if(!check_localstorage && size_window <= 600){
            btn_login.classList.toggle("show-btn");
            btn_register.classList.toggle("show-btn");
        }
    }

    return(
        <header>
            <div className="content-header">
                <div className="content-header__logo">
                    <a href="/"><img className="__logo" src={logo_login} alt="logo"/></a>
                </div>
                <nav className="content-header__links">
                    <a href="/#">Contacto</a>
                    <a href="/#">Acerca de</a>
                    <a href="/#">Proyectos</a>
                </nav>
                <div className="content-header__buttons">
                    {user_localStorage === null 
                        ?(
                            <div>
                                <button className="__login btn-principal" onClick={submitLogin}>Iniciar Sesión</button>
                                <button className="__register btn-principal" onClick={submitRegister} >Registrarse</button>
                                <Link href="/" to="/#" onClick={onClickShowMenu}><i className="fas fa-bars"></i></Link>
                            </div>
                        ) 
                        :(
                            <div>
                                <button className="btn-saludo btn-principal" onClick={goToAgenda}>{`Buen dia ${user_localStorage}`}</button>
                                <button className="__login btn-principal" onClick={closeSession}>Cerrar Sesión</button>
                                <Link href="/" to="/#" onClick={onClickShowMenu}><i className="fas fa-bars"></i></Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}


export default Header;