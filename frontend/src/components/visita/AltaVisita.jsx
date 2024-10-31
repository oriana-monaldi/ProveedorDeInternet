import React from 'react'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import {Link} from 'react-router-dom'
import Boton from '../Boton'

function ProgramarVisita() {
    const [opcion, setOpcion] = useState("");

    const handleChange = (e) => {
    setOpcion(e.target.value);
    };
    return (
        <div>
            <h1 className='text-2xl'> Programar visita </h1>
            <div className='flex flex-col p-6 '>
                <div className='flex justify-around'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                    </LocalizationProvider>                
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        variant="filled"
                        label="Numero"
                    />
                </div>


                <div className='p-4'>
                    <h2 className='text-lg p-4'>Domicilio</h2>
                    <div className='flex justify-around p-4'>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        variant="filled"
                        label="Calle"
                    />
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            variant="filled"
                            label="Numero"
                        />
                    </div>
                    <div className='flex justify-around p-4'>
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            variant="filled"
                            label="Piso"
                        />
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                variant="filled"
                                label="Depto"
                            />
                    </div>
                </div>  
                <div className='flex justify-end p-8'>
                    <div className='p-4'>
                        <Link to='/visita'>
                            <Boton nombre="Aceptar"/>
                        </Link>
                    </div>
                    <div className='p-4'>
                        <Link to='/visita'>
                            <Boton nombre="Cancelar"/>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProgramarVisita