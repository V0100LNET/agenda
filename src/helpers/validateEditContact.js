export default async function validateEditContact(values){
    let errors = {}

    if(!values.newName){
        errors.newName = "El nombre es obligatorio";
    }

    if(!values.newLastName){
        errors.newLastName = "Los apellidos son obligatorios";
    }

    if(!values.newPhone){
        errors.newPhone = "El teléfono es obligatorio";
    }

    if(!values.newEmail){
        errors.newEmail = "El email es obligatorio";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.newEmail)){
        errors.newEmail = "El email no es válido";
    }

    return errors;
}