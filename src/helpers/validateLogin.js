export default async function validateLogin(values){
    let errores = {};

    if(!values.email){
        errores.email = "Todos los campos son obligatorios";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errores.email = "El email no es válido";
    }

    if(!values.password){
        errores.password = "Todos los campos son obligatorios";
    }

    return errores;
}