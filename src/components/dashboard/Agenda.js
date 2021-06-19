import React, { Fragment, useContext, useState } from 'react';
import Header from '../layout/Header';
import CardContact from '../CardContact';
import { PrincipalContext } from '../../context';
import ModalAddNewContact from '../modals/ModalAddNewContact';

const Agenda = () => {
    const {
        modalAddNewContact, setModalAddNewContact,
        setOpacity
    } = useContext(PrincipalContext);

    const showModalAddNewContact = () => {
        const addOpacity = document.querySelector(".content-buttons");
        const addOpacityCard = document.querySelector(".content__card");
        addOpacity.classList.add("opacity-modal");
        addOpacityCard.classList.add("opacity-modal");
        setOpacity.style.overflow = "hidden"
        setModalAddNewContact(true);
    }


    return(
        <Fragment>
            <Header/>
            
            <div className="content-buttons">
                <h1 className="agenda__title">Agenda de Contactos ekomercio</h1>
                <button 
                    className="btn-principal content-buttons_add-new"
                    onClick={showModalAddNewContact}
                >Agregar Nuevo Contacto</button>
                <input type="text" placeholder="Buscar" className="input-principal"/>
            </div>
            
            <CardContact/>

            {modalAddNewContact ? <ModalAddNewContact/> : null}

        </Fragment>
    )
}


export default Agenda