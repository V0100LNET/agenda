import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import { PrincipalContext } from '../context';
import Spinner from './Spinner';


const CardContact = ({info2}) => {
    const [noDataForToShow, setNoDataForToShow] = useState("");
    const {
        setModalAddNewContact, dataContacts, 
        setDataContacts,
        spinner, setSpinner
    } = useContext(PrincipalContext);
    // const info = [
    //     {
    //         name: "Oswaldo",
    //         lastName: "Hernández Velásquez",
    //         telephone: "5532595949",
    //         email: "valdo_monster@hotmail.com"
    //     },
    //     {
    //         name: "Paloma",
    //         lastName: "Hernández Vargas",
    //         telephone: "5523423423",
    //         email: "paloma@hotmail.com"
    //     },
    //     {
    //         name: "Norimar",
    //         lastName: "Hernández Velásquez",
    //         telephone: "5523423423",
    //         email: "valdo_monster@hotmail.com"
    //     },
    //     {
    //         name: "Ariadne",
    //         lastName: "Gallardo",
    //         telephone: "5532595949",
    //         email: "valdo_monster@hotmail.com"
    //     },
    //     {
    //         name: "Ariadne",
    //         lastName: "Gallardo",
    //         telephone: "5532595949",
    //         email: "valdo_monster@hotmail.com"
    //     },
    //     {
    //         name: "Ariadne",
    //         lastName: "Gallardo",
    //         telephone: "5532595949",
    //         email: "valdo_monster@hotmail.com"
    //     },
    //     {
    //         name: "Ariadne",
    //         lastName: "Gallardo",
    //         telephone: "5532595949",
    //         email: "valdo_monster@hotmail.com"
    //     }
    // ]

    useEffect(() => {
        const getDataContact = async() => {
            setSpinner(true);
            const sendEmail = {"email": localStorage.getItem('email')}
            let requestDataBase = await axiosClient.post('/get-contacts', sendEmail);
            console.log(requestDataBase.data);
        
            setTimeout(() => {
                setDataContacts(requestDataBase.data);
                setSpinner(false);
            },2000);

        }

        getDataContact();
        setNoDataForToShow(dataContacts.length)

        //eslint-disable-next-line
    },[])

    console.log(noDataForToShow);


    return(
        <section className="content__card">
            {/* {noDataForToShow === 0 ? <h1>No hay Contactos para mostrar</h1> : null} */}
            {dataContacts.map((info, index) => (
                <div className="card">
                    <div key={index} className="card__info">
                        <h2 className="card__info_title">{info.name}</h2>
                        <h2><span className="card__info_bold">Nombre:</span> {`${info.name} ${info.lastName}`}</h2>
                        <h2><span className="card__info_bold">Teléfono:</span> {info.phone}</h2>
                        <h2><span className="card__info_bold">Correo Electrónico:</span> {info.email}</h2>
                        <button className="btn-principal card__button-delete">Eliminar</button>
                        <button className="btn-principal card__button-edit">Editar</button>
                    </div>
                </div>
            ))}
            {spinner ? <Spinner/> : null}
        </section>
    )
}


export default CardContact