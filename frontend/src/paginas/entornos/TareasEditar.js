import React from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TareasEditar = () => {

    const navigate = useNavigate();

    const { identorno } = useParams();
    let arreglo = identorno.split('@');
    const nombreTarea = arreglo[1];
    const clasificacionTarea = arreglo[2];
    const descripcionTarea = arreglo[3];
    const idEntorno = arreglo[4];
    const nombreEntorno = arreglo[5];
    const tituloPagina = `Editar una Tarea para el Entorno: ${nombreEntorno}`;

    const [tareas, setTareas] = useState({
        nombre_tarea: nombreTarea,
        descripcion_tarea: descripcionTarea,
        clasificacion_tarea: clasificacionTarea,
        id_entorno: idEntorno
    });

    const { nombre_tarea, descripcion_tarea, clasificacion_tarea } = tareas;

    useEffect(() => {
        document.getElementById('nombre_tarea').focus();
    }, []);

    const onChange = (e) => {
        setTareas({
            ...tareas,
            [e.target.name]: e.target.value
        });
    }

    const editarTarea = async () => {
        let arreglo = identorno.split('@');
        const idTarea = arreglo[0];
        const nombreTarea = arreglo[1];
        const clasificacionTarea = arreglo[2];
        const descripcionTarea = arreglo[3];
        const idEntorno = arreglo[4];
        const nombreEntorno = arreglo[5];

        const data = {
            entorno: idEntorno,
            nombre_tarea: tareas.nombre_tarea,
            descripcion_tarea: tareas.descripcion_tarea,
            clasificacion_tarea: tareas.clasificacion_tarea,
            estado: false
        }
        const response = await APIInvoke.invokePUT(`/actualizarTarea/${idTarea}`, data);
        const idTareaEditado = response.data._id;

        if (idTareaEditado !== idTarea) {
            const message = 'La tarea no fue editada correctamente';
            swal({
                title: 'Error',
                text: message,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            navigate(`/tareas-admin/${idEntorno}@${nombreEntorno}`);
            const message = 'La tarea fue editada correctamente';
            swal({
                title: 'Información',
                text: message,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        value: true,
                        visible: true,
                        className: 'btn btn-success',
                        closeModal: true
                    }
                }
            });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        editarTarea();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Lista de Tareas"}
                    breadCrumb2={"Edición"}
                    ruta1={`/tareas-admin/${idEntorno}@${nombreEntorno}`}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre_tarea">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre_tarea"
                                            name="nombre_tarea"
                                            placeholder="Ingrese el nombre de la tarea"
                                            value={nombre_tarea}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="clasificacion_tarea">Clasificacion de la tarea</label>
                                        <input type="text"
                                            className="form-control"
                                            id="clasificacion_tarea"
                                            name="clasificacion_tarea"
                                            placeholder="Ingrese la clasificación de la tarea"
                                            value={clasificacion_tarea}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descripcion_tarea">Descripcion de la tarea</label>
                                        <input type="text"
                                            className="form-control"
                                            id="descripcion_tarea"
                                            name="descripcion_tarea"
                                            placeholder="Ingrese la descripción de la tarea"
                                            value={descripcion_tarea}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>


                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default TareasEditar;