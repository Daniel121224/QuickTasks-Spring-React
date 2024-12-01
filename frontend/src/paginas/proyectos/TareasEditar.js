import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';

const TareasEditar = () => {
    const navigate = useNavigate();
    
    // Obtener el ID de la tarea desde la URL
    const { idTarea } = useParams();
    
    // Definir el estado inicial de la tarea
    const [tarea, setTarea] = useState({
        nombreTarea: '',
        descripcionTarea: '',
        fechaEntregaTarea: '',
        completada: false
    });
    
    const { nombreTarea, descripcionTarea, fechaEntregaTarea, completada } = tarea;

    // Obtener los datos de la tarea cuando el componente se monta
    useEffect(() => {
        const cargarTarea = async () => {
            const response = await APIInvoke.invokeGET(`/api/tarea/${idTarea}`);
            if (response) {
                setTarea({
                    nombreTarea: response.nombreTarea,
                    descripcionTarea: response.descripcionTarea,
                    fechaEntregaTarea: response.fechaEntregaTarea,
                    completada: response.completada
                });
            }
        };
        cargarTarea();
    }, [idTarea]);

    // Función para manejar los cambios en los campos de entrada
    const onChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    };

    // Función para editar la tarea
    const editarTarea = async () => {
        const data = {
            idTarea: idTarea, // Asegúrate de incluir el id de la tarea
            nombreTarea: tarea.nombreTarea,
            descripcionTarea: tarea.descripcionTarea,
            fechaEntregaTarea: tarea.fechaEntregaTarea,
            completada: tarea.completada
        };

        const response = await APIInvoke.invokePUT(`/api/tarea/update`, data);

        if (response === "Tarea actualizado correctamente") {
            swal({
                title: 'Información',
                text: 'Tarea actualizada correctamente',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-success',
                    },
                },
            });
            navigate('/tareas-admin/idProyecto');
        } else {
            swal({
                title: 'Error',
                text: 'No se pudo actualizar la tarea',
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

    // Función para manejar el submit del formulario
    const onSubmit = (e) => {
        e.preventDefault();
        editarTarea();
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo="Edición de Tareas"
                    breadCrumb1="Lista de Tareas"
                    breadCrumb2="Edición"
                    ruta1="/tareas-admin"
                />
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nombreTarea">Nombre de la Tarea</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombreTarea"
                                        name="nombreTarea"
                                        placeholder="Ingrese el nombre de la tarea"
                                        value={nombreTarea}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcionTarea">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="descripcionTarea"
                                        name="descripcionTarea"
                                        placeholder="Ingrese la descripción de la tarea"
                                        value={descripcionTarea}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fechaEntregaTarea">Fecha de Entrega</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="fechaEntregaTarea"
                                        name="fechaEntregaTarea"
                                        value={fechaEntregaTarea}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="completada">Completada</label>
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        id="completada"
                                        name="completada"
                                        checked={completada}
                                        onChange={() => setTarea({ ...tarea, completada: !completada })}
                                    />
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default TareasEditar;
