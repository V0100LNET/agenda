export default async function validateNewContact(values){
    let errors = {};

    values.creator = localStorage.getItem('email');

    if(!values.name){
        errors.name = "El nombre es obligatorio";
    }

    if(!values.lastName){
        errors.lastName = "Los apellidos son obligatorios";
    }

    if(!values.phone){
        errors.phone = "El teléfono es obligatorio";
    }

    if(!values.email){
        errors.email = "El email es obligatorio";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "El email no es válido";
    }

    if(!values.creator){
        errors.creator = "Hubo un error interno, vuelve a iniciar sesión por favor";
    }
    return errors;

}
