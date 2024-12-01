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

const TareasAdmin = () => {
    const [tareas, setTareas] = useState([]);
    const { idProyecto, nombreProyecto } = useParams();

    const tituloPagina = `Tareas del Proyecto: ${nombreProyecto}`;

    // Cargar las tareas asociadas al proyecto
    const cargarTareas = async () => {
        const response = await APIInvoke.invokeGET(`/api/tarea/list?proyecto=${idProyecto}`);
        setTareas(response);
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    // Eliminar tarea
    const eliminarTarea = async (e, idTarea) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/tarea/${idTarea}`);

        if (response && response.message === "Tarea eliminada con éxito") {
            swal({
                title: 'Información',
                text: 'La tarea fue eliminada con éxito',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-success',
                    },
                },
            });
            cargarTareas();
        } else {
            swal({
                title: 'Error',
                text: 'No fue posible eliminar la tarea',
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
                    breadCrumb1="Lista de Proyectos"
                    breadCrumb2="Tareas"
                    ruta1="/proyectos-admin"
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link
                                    to={`/tareas-crear/${idProyecto}`}
                                    className="btn btn-block btn-primary btn-sm"
                                >
                                    Agregar Tarea
                                </Link>
                            </h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '20%' }}>Nombre</th>
                                        <th style={{ width: '30%' }}>Descripción</th>
                                        <th style={{ width: '20%' }}>Fecha Entrega</th>
                                        <th style={{ width: '10%' }}>Estado</th>
                                        <th style={{ width: '10%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tareas.map((tarea) => (
                                        <tr key={tarea.idTarea}>
                                            <td>{tarea.idTarea}</td>
                                            <td>{tarea.nombreTarea}</td>
                                            <td>{tarea.descripcionTarea}</td>
                                            <td>{new Date(tarea.fechaEntregaTarea).toLocaleDateString()}</td>
                                            <td>{tarea.completada ? 'Completada' : 'Pendiente'}</td>
                                            <td>
                                                <Link
                                                    to={`/tareas-editar/${tarea.idTarea}`}
                                                    className="btn btn-primary btn-sm"> Editar </Link> &nbsp;
                                                <button
                                                    onClick={(e) => eliminarTarea(e, tarea.idTarea)}
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

export default TareasAdmin;
