import React, { useContext, useState } from 'react'
import { PrincipalContext } from '../../context';
import validateEditContact from '../../helpers/validateEditContact';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import Spinner from '../Spinner';

const ModalEditContact = () => {
    const { modalEditContact, setModalEditContact, newContact ,setOpacity, infoContactForEdit, setInfoContactForEdit, spinner, setSpinner} = useContext(PrincipalContext);
    const {name, lastName, phone, email, _id} = infoContactForEdit; //destructuracion de los datos anteriores
    const [dataContactEdit, setDataContactEdit] = useState({
        id: _id.$oid,
        newName: name,
        newLastName: lastName,
        newPhone: phone,
        newEmail: email
    })
    const {newName, newLastName, newPhone, newEmail, id} = dataContactEdit; //nuevos cambios para editar contacto

    // const changeDataEditContact = (e) => {
    //     setDataContactEdit({
    //         ...dataContactEdit,
    //         [e.target.name]: e.target.value
    //     })
    // }
    
    const closeModalEditContact = () => {
        const addOpacity = document.querySelector(".content-buttons");
        const addOpacityCard = document.querySelector(".content__card");
        addOpacity.classList.remove("opacity-modal");
        addOpacityCard.classList.remove("opacity-modal");
        setOpacity.style.overflow = "visible"
        setModalEditContact(false);
    }

    const saveChanges = async(e) => {
        e.preventDefault();
        const validateData = await validateEditContact(dataContactEdit)
        console.log(validateData)
        if(Object.keys(validateData) != 0){
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: (validateData.newName || validateData.newLastName || validateData.newPhone || validateData.newEmail ),
                confirmButtonText: 'Aceptar'
            })

            return;
        }
        
        try{
            const setOpacityModalEditContact = document.querySelector(".add-contact");
            setOpacityModalEditContact.classList.add("opacity");
            setSpinner(true);
            let responseDataBase = await axiosClient.post('/update-contact', dataContactEdit);
            
            if(responseDataBase.data.status === 405){
                setOpacityModalEditContact.classList.remove("opacity");
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
                    title: '¡Cambios guardados con éxito!',
                    confirmButtonText: 'Aceptar'
                })
                setSpinner(false);
                setOpacityModalEditContact.classList.remove("opacity");
                setDataContactEdit({
                    newName: "",
                    newLastName: "",
                    newPhone: "",
                    newEmail: ""
                })
            },2000)

            setTimeout(() => {
                window.location.reload();
            },3500)


        }catch (error){
            console.log(error);
        }

        console.log(dataContactEdit);
    }

    console.log(name, lastName, phone, email)



    const handleChange = (field, value) => {
        setDataContactEdit({
            ...dataContactEdit,
            [field]: value
        })
        console.log(field, value);
    }
    return(
        <section className="add-contact">
            {spinner ? <Spinner/> : null}
            <button onClick={closeModalEditContact} className="close-modal">
                <i className="fas fa-times"></i>
            </button>
            <h1 className="add-contact__title">Editar Contacto</h1>
            <form className="add-contact__form">
                <label>Nombre</label>
                <input 
                    type="text" 
                    placeholder="Nombre"
                    value={dataContactEdit.newName}
                    name="newName"
                    onChange={ e => handleChange(e.target.name, e.target.value) }
                />
                
                <label>Apellidos</label>
                <input 
                    type="text" 
                    placeholder="Apellidos"
                    value={dataContactEdit.newLastName}
                    name="newLastName"
                    onChange={ e => handleChange(e.target.name, e.target.value)}
                />
                
                <label>Teléfono</label>
                <input 
                    type="number" 
                    placeholder="Teléfono"
                    value={dataContactEdit.newPhone}
                    name="newPhone"
                    onChange={ e => handleChange(e.target.name, e.target.value)}
                />
                
                <label>Correo Electrónico</label>
                <input 
                    type="email"
                    placeholder="Email"
                    value={dataContactEdit.newEmail}
                    name="newEmail"
                    onChange={ e => handleChange(e.target.name, e.target.value)}
                />
                
                <button className="btn-principal btn-add-contact" onClick={saveChanges}>Guardar Cambios</button>
            </form>
        </section>
    )
}


export default ModalEditContact;