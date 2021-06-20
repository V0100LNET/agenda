import img_page from "../../assets/svg/img_home_page.svg";
import React, { Fragment } from 'react';
import Header from './Header';


const Home = () => {
    return(
        <Fragment>
            <Header/>
            
            <main>
                <section className="left">
                    <h1>Agenda de Contactos openagenda.</h1>
                    <p>
                        Con openagenda encontraras las mejores herramientas 
                        para registrar tus contactos de una manera intuitiva, 
                        además podrás consultarlos desde cualquier lugar.
                    </p>
                    <button className="obtain-account btn-principal">Obtener Cuenta</button>
                </section>
                <section className="right">
                    <img src={img_page} alt="img_page"/>
                </section>
            </main>
        </Fragment>
    )
}


export default Home;