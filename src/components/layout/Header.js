import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import logo_login from "../../assets/img/logo-Ekomercio.png"
import { PrincipalContext } from '../../context';

const Header = () => {
    const setOpacity = document.body;
    const {setSpinner} = useContext(PrincipalContext);
    const history = useHistory();
    const user_localStorage = localStorage.getItem("name");
    
    const submitLogin = () => {
        history.push('/login');
    }

    const submitRegister = () => {
        history.push('/register');
    }

    const goToAgenda = () => {
        history.push('/agenda');
    }

    const closeSession = () => {
        setOpacity.classList.add("opacity");
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
            setOpacity.classList.remove("opacity");
            history.push('/');
        },2000)
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
                                <a href="/#"><i className="fas fa-bars"></i></a>
                            </div>
                        ) 
                        :(
                            <div>
                                <button className="btn-principal btn-saludo" onClick={goToAgenda}>{`Buen dia ${user_localStorage}`}</button>
                                <button className="__login btn-principal" onClick={closeSession}>Cerrar Sesión</button>
                                <a href="/#"><i className="fas fa-bars"></i></a>
                            </div>
                        )
                    }
                
                </div>
            </div>
        </header>
    )
}


export default Header;