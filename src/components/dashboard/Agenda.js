import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../layout/Header';
import CardContact from '../CardContact';
import { PrincipalContext } from '../../context';
import ModalAddNewContact from '../modals/ModalAddNewContact';
import ModalEditContact from '../modals/ModalEditContact';
import axiosClient from '../../config/axios';

const Agenda = () => {
    // const [contacts, setContacts] = useState(null);
    const {
        modalAddNewContact, setModalAddNewContact,
        setOpacity, modalEditContact,
        dataContacts, setDataContacts,
        setSpinner
    } = useContext(PrincipalContext);

    const showModalAddNewContact = () => {
        const addOpacity = document.querySelector(".content-buttons");
        const addOpacityCard = document.querySelector(".content__card");
        addOpacity.classList.add("opacity-modal");
        addOpacityCard.classList.add("opacity-modal");
        setOpacity.style.overflow = "hidden"
        setModalAddNewContact(true);
    }

    const onChangeSearchContact = async(e) => {
        if(e.target.value === ""){
            const sendEmail = {"email": localStorage.getItem('email')}
            let requestDataBase = await axiosClient.post('/get-contacts', sendEmail);
            
            return setDataContacts(requestDataBase.data);
        }

        const typeSearch = e.target.value.toLowerCase();
        const search = dataContacts.filter(elem => elem.name.toLocaleLowerCase().includes(typeSearch));
        setDataContacts(search);
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
                
                <input 
                    type="text" placeholder="Buscar Contacto" 
                    className="input-principal"
                    onChange={onChangeSearchContact}
                />
            </div>
            
            <CardContact/>

            {modalAddNewContact ? <ModalAddNewContact/> : null}
            {modalEditContact ? <ModalEditContact/> : null}
        </Fragment>
    )
}


export default Agenda