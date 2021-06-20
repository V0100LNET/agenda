import { createContext, useState } from "react";


export const PrincipalContext = createContext({});

export const ContextProvider = ({children}) => {
    const setOpacity = document.body;
    const [spinner, setSpinner] = useState(false);
    
    const [modalAddNewContact, setModalAddNewContact] = useState(false);
    const [modalEditContact, setModalEditContact] = useState(false);

    const [infoContactForEdit, setInfoContactForEdit] = useState();
    
    const [dataContacts, setDataContacts] = useState([]);
    
    const [newContact, setNewContact] = useState({
        "name": "",
        "lastName": "",
        "phone": "",
        "email": "",
        "creator": ""
    })


    return(
        <PrincipalContext.Provider
            value={{
                spinner, setSpinner,
                setOpacity,
                modalAddNewContact, setModalAddNewContact,
                dataContacts, setDataContacts,
                newContact, setNewContact,
                modalEditContact, setModalEditContact,
                infoContactForEdit, setInfoContactForEdit,
            }}>
            {children}
        </PrincipalContext.Provider>
    )
}