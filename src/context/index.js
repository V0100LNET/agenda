import { createContext, useState } from "react";


export const PrincipalContext = createContext({});

export const ContextProvider = ({children}) => {
    const setOpacity = document.body;
    const [spinner, setSpinner] = useState(false);
    const [modalAddNewContact, setModalAddNewContact] = useState(false);
    const [dataContacts, setDataContacts] = useState([]);


    return(
        <PrincipalContext.Provider
            value={{
                spinner, setSpinner,
                setOpacity,
                modalAddNewContact, setModalAddNewContact,
                dataContacts, setDataContacts
            }}>
            {children}
        </PrincipalContext.Provider>
    )
}