import  {apiUrl} from './constants'

export async function getClientes() {
try { 
    const response = await fetch(`${apiUrl}/clientes/all`)
    const data = await response.json()       
        return data
} catch(error) {
    console.error("Error al consumir la api",  error );
    } 
}