import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import fondoVerde from '../../assets/fondoverde.jpg';

const RecordatoriosAdmin = () => {
    const [recordatorios, setRecordatorios] = useState([]);
    const { idTarea} = useParams(); //, nombreTarea 

    const tituloPagina = `Recordatorios`; //de la Tarea: ${nombreTarea}

    // Cargar los recordatorios asociados a la tarea
    const cargarRecordatorios = async () => {
        const response = await APIInvoke.invokeGET(`/api/recordatorio/list`);
        setRecordatorios(response);
    };

    useEffect(() => {
        cargarRecordatorios();
    }, []);

    // Eliminar recordatorio
    const eliminarRecordatorio = async (e, idRecordatorio) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/recordatorio/${idRecordatorio}`);

        if (response && response.message === "Recordatorio eliminado con éxito") {
            swal({
                title: 'Información',
                text: 'El recordatorio fue eliminado con éxito',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-success',
                    },
                },
            });
            cargarRecordatorios();
        } else {
            swal({
                title: 'Error',
                text: 'No fue posible eliminar el recordatorio',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-danger',
                    },
                },
            });
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div
                className="content-wrapper"
                style={{ backgroundImage: `url(${fondoVerde})`, backgroundSize: 'cover' }}
            >
                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1="Lista de Tareas"
                    breadCrumb2="Recordatorios"
                    ruta1="/tareas-admin"
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link
                                    to={`/recordatorios-crear/${idTarea}`}
                                    className="btn btn-block btn-primary btn-sm"
                                >
                                    Agregar Recordatorio
                                </Link>
                            </h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '20%' }}>Mensaje</th>
                                        <th style={{ width: '30%' }}>Fecha Recordatorio</th>
                                        <th style={{ width: '20%' }}>Enviado</th>
                                        <th style={{ width: '10%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordatorios.map((recordatorio) => (
                                        <tr key={recordatorio.idRecordatorio}>
                                            <td>{recordatorio.idRecordatorio}</td>
                                            <td>{recordatorio.mensaje}</td>
                                            <td>{new Date(recordatorio.fechaRecordatorio).toLocaleString()}</td>
                                            <td>{recordatorio.enviado ? 'Sí' : 'No'}</td>
                                            <td>
                                                <Link
                                                    to={`/recordatorios-editar/${recordatorio.idRecordatorio}`}
                                                    className="btn btn-primary btn-sm"> Editar </Link> &nbsp;
                                                <button
                                                    onClick={(e) => eliminarRecordatorio(e, recordatorio.idRecordatorio)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Borrar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default RecordatoriosAdmin;
