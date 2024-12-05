import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '../Boton';
import { Link } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { getClientes } from '../../../services/clientes';
import { deleteCliente } from '../../../services/clientes';

function alertDelete(id) {
    deleteCliente(id);
    console.log(id)
    swal({
        title: "¿Esta seguro que desea eliminar el cliente?",
        text: "Si decide eliminarlo no podrá recuperarlo",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            try {
                swal("Se ha eliminado exitosamente", {
                    icon: "success",
                });
            } catch (error) {
                swal("Error al eliminar el cliente", {
                    icon: "error",
                });
            }
        } else {
            swal("El cliente no se ha eliminado");
        }
    });
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
        getClientes().then( (data) => {
            setClientes(data)
            console.log(clientes)
        }).finally( () => {
            setLoading(false);
        })
    },[])

    if (loading) {
        return (
            <div className="m-6 mt-16 flex justify-center items-center">
                <p className='text-white'>Cargando clientes...</p>
            </div>
        );
    }


    return (
        <div className='m-6 mt-16'>
            {clientes && clientes.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Apellido</StyledTableCell>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell>DNI</StyledTableCell>
                                <StyledTableCell>Teléfono</StyledTableCell>
                                <StyledTableCell align="center">Acciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map((row) => (
                                <StyledTableRow key={row.ID}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.apellido}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.nombre}</StyledTableCell>
                                    <StyledTableCell>{row.dni}</StyledTableCell>
                                    <StyledTableCell>{row.telefono}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className='flex item-center justify-center'>
                                            <Link to='/editar-cliente'>
                                                <CiEdit size={30} />
                                            </Link>
                                            <MdDeleteForever
                                                onClick={()=>alertDelete(row.ID)}
                                                size={30}
                                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                                            />
                                            <Link to='/conexion'>
                                                <Button nombre="Conexión" />
                                            </Link>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div className="text-center">
                    <p className='text-white'>No hay clientes disponibles</p>
                </div>
            )}
        </div>
    );
}