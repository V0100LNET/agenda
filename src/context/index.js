import { createContext, useContext } from "react";


export const PrincipalContext = createContext({});

export const ContextProvider = ({children}) => {
    const [test, setTest] = useContext("mensaje de prueba");





    return(
        <PrincipalContext.Provider
            value={{
                test
            }}>
            {children}
        </PrincipalContext.Provider>
    )
}