import React, { useContext, useState } from 'react';
import { PrincipalContext } from '../../context';
import validateNewContact from '../../helpers/validateNewContact';
import Swal from 'sweetalert2'
import axiosClient from '../../config/axios';
import Spinner from '../Spinner';
import { useHistory } from 'react-router-dom';


const ModalAddNewContact = () => {
    const history = useHistory();
    const {
        setModalAddNewContact, setOpacity, 
        spinner, setSpinner, 
        newContact, setNewContact,
    } = useContext(PrincipalContext);
    const {name, lastName, phone, email} = newContact;
    
    const setDataNewContact = (e) => {
        setNewContact({
            ...newContact,
            [e.target.name]: e.target.value
        })
    }
    
    const closeModalAddNewContact = () => {
        const addOpacity = document.querySelector(".content-buttons");
        const addOpacityCard = document.querySelector(".content__card");
        addOpacity.classList.remove("opacity-modal");
        addOpacityCard.classList.remove("opacity-modal");
        setOpacity.style.overflow = "visible"
        setModalAddNewContact(false);
    }

    const saveContact = async(e) => {
        e.preventDefault();
        const validateData = await validateNewContact(newContact);
        
        if(Object.keys(validateData) != 0){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: (validateData.name || validateData.lastName || validateData.phone || validateData.email || validateData.creator),
                confirmButtonText: 'Aceptar'
            })

            return;
        }

        try{
            const setOpacityModalNewContact = document.querySelector(".add-contact");
            setOpacityModalNewContact.classList.add("opacity");
            setSpinner(true);
            let responseDataBase = await axiosClient.post('/contact', newContact);
            
            if(responseDataBase.data.status === 406 || responseDataBase.data.status === 405){
                setOpacityModalNewContact.classList.remove("opacity");
                Swal.fire({
                    icon: 'error',
                    title: '¡ERROR!',
                    text: responseDataBase.data.message,
                    confirmButtonText: 'Aceptar'
                })

                return
            }

            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡El contacto se ha agreado correctamente!',
                    confirmButtonText: 'Aceptar'
                })
                setSpinner(false);
                setOpacityModalNewContact.classList.remove("opacity");
                setNewContact({
                    "name": "",
                    "lastName": "",
                    "phone": "",
                    "email": "",
                    "creator": ""
                })
            },2000)

            setTimeout(() => {
                window.location.reload();
            },3500)


        }catch (error){
            console.log(error);
        }

        console.log(newContact);
    }


    return(
        <section className="add-contact">
            {spinner ? <Spinner/> : null}
            <button onClick={closeModalAddNewContact} className="close-modal">
                <i className="fas fa-times"></i>
            </button>
            <h1 className="add-contact__title">Agregar Contacto</h1>
            <form className="add-contact__form">
                <label>Nombre</label>
                <input 
                    type="text" 
                    placeholder="Nombre"
                    name="name"
                    value={name}
                    onChange={setDataNewContact}
                />
                
                <label>Apellidos</label>
                <input 
                    type="text" 
                    placeholder="Apellidos"
                    name="lastName"
                    value={lastName}
                    onChange={setDataNewContact}
                />
                
                <label>Teléfono</label>
                <input 
                    type="number" 
                    placeholder="Teléfono"
                    name="phone"
                    value={phone}
                    onChange={setDataNewContact}
                />
                
                <label>Correo Electrónico</label>
                <input 
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={setDataNewContact}
                />
                
                <button className="btn-principal btn-add-contact" onClick={saveContact}>Agregar Contacto</button>
            </form>
        </section>
    )
}


export default ModalAddNewContact;