export default async function validateRegister(values){
    let errores = {};

    if(!values.email){
        errores.email = "El email es obligatorio";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errores.email = "El email no es valido";
    }

    if(!values.password){
        errores.password = "El password es obligatorio";
    }

    if(!values.repeat_password){
        errores.repeat_password = "Necesitas confirmar la contraseña";
    }

    if(values.password !== values.repeat_password){
        errores.equals_password = "Las contraseñas no coinciden";
    }

    return errores;

}