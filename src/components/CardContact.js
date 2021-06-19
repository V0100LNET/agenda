import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import { PrincipalContext } from '../context';
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import EditInfoContact from './modals/ModalEditContact';


const CardContact = ({info2}) => {
    const [noDataForToShow, setNoDataForToShow] = useState(false);
    const {
        dataContacts, 
        setDataContacts, setOpacity,
        spinner, setSpinner,
        modalEditContact, setModalEditContact,
        infoContactForEdit, setInfoContactForEdit
    } = useContext(PrincipalContext);

    useEffect(() => {
        const getDataContact = async() => {
            setSpinner(true);
            const sendEmail = {"email": localStorage.getItem('email')}
            let requestDataBase = await axiosClient.post('/get-contacts', sendEmail);
        
            await setTimeout(() => {
                setDataContacts(requestDataBase.data);
                setSpinner(false);
            },2000);

        }

        getDataContact();

        //eslint-disable-next-line
    },[])



    const handleDeleteContact = (id) => {
        Swal.fire({
            title: '¿Estás seguro que deseas aliminar el contacto?',
            text: "¡No podrás deshacer esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if(result.isConfirmed){
                setOpacity.classList.add("opacity");
                setSpinner(true);
                try{
                    let idContact = {"id": id.$oid};
                    let responseDataBase = await axiosClient.post(`/delete-contact`, idContact);
                }catch (error) {
                    console.log(error);
                }
                setTimeout(() => {
                    Swal.fire({
                        title: '¡Contacto Eliminado!',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                    setSpinner(false);
                    setOpacity.classList.remove("opacity");
                    setTimeout(() => window.location.reload(),1500);
                },2500)
            }
            else{
                return
            }
        })
    }

    const handleEditContact = (info) => {
        setInfoContactForEdit(info)
        console.log(info);
        const addOpacity = document.querySelector(".content-buttons");
        const addOpacityCard = document.querySelector(".content__card");
        addOpacity.classList.add("opacity-modal");
        addOpacityCard.classList.add("opacity-modal");
        setOpacity.style.overflow = "hidden"
        setModalEditContact(true);
    }
    


    return(
        <section className="content__card">
            {/* {noDataForToShow ? <h1>No hay Contactos para mostrar</h1> : null} */}
            {dataContacts.map((info, index) => (
                <div className="card">
                    <div key={index} className="card__info">
                        <h2 className="card__info_title">{info.name}</h2>
                        <h2><span className="card__info_bold">Nombre:</span> {`${info.name} ${info.lastName}`}</h2>
                        <h2><span className="card__info_bold">Teléfono:</span> {info.phone}</h2>
                        <h2><span className="card__info_bold">Correo Electrónico:</span> {info.email}</h2>
                        <button className="btn-principal card__button-delete" onClick={() => handleDeleteContact(info._id)}>Eliminar</button>
                        <button className="btn-principal card__button-edit" onClick={() => handleEditContact(info)}>Editar</button>
                    </div>
                </div>
            ))}
            {spinner ? <Spinner/> : null}
            {modalEditContact ? <EditInfoContact/> : null}
        </section>
    )
}


export default CardContact