import axios from "axios";


export const API = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    
});


export const getError = (status: number) => {
    switch (status) {
        case 400:
            return "Petición incorrecta";
        case 401:
            return "No autorizado";
        case 403:
            return "Prohibido";
        case 404:
            return "No encontrado";
        case 500:
            return "Error interno del servidor";
        default:
            return "Error desconocido";
    }
}