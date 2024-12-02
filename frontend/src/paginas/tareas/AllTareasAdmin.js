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

const AllTareasAdmin = () => {
    const [tareas, setTareas] = useState([]);
    const { idProyecto } = useParams();

    const tituloPagina = `Tareas`;

    // Cargar las tareas asociadas
    const cargarTareas = async () => {
        const response = await APIInvoke.invokeGET(`/api/tarea/list`);
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
                            <div className="row">
                                {tareas.map((tarea) => (
                                    <div key={tarea.idTarea} className="col-md-4">
                                        <div className="card mb-3">
                                            <div className="card-header">
                                                <h5>{tarea.nombreTarea}</h5>
                                            </div>
                                            <div className="card-body">
                                                <p><strong>Descripción:</strong> {tarea.descripcionTarea}</p>
                                                <p><strong>Fecha de Entrega:</strong> {new Date(tarea.fechaEntregaTarea).toLocaleDateString()}</p>
                                                <p><strong>Estado:</strong> {tarea.completada ? 'Completada' : 'Pendiente'}</p>
                                            </div>
                                            <div className="card-footer text-center">
                                                <Link
                                                    to={`/tareas-editar/${tarea.idTarea}`}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Editar
                                                </Link>
                                                &nbsp;
                                                <button
                                                    onClick={(e) => eliminarTarea(e, tarea.idTarea)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Borrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default AllTareasAdmin;
