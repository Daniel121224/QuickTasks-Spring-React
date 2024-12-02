import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TareasCrear = () => {
    const navigate = useNavigate();
    const { idproyecto } = useParams(); // Obtener el parámetro idproyecto de la URL
    const [tareas, setTareas] = useState({
        nombreTarea: '',
        descripcionTarea: '',
        fechaEntregaTarea: '',
        completada: false,
        proyecto: {
            idProyecto: idproyecto, // Asegúrate de usar la clave exacta que el backend espera.
        }
    });

    const { idProyecto } = useParams();
    let arreglo = idProyecto.split('@');
    const nombreProyecto = arreglo[1];
    const tituloPagina = `Crear/Agregar una Tarea para el Proyecto: ${nombreProyecto}`;

    useEffect(() => {
        document.getElementById('nombreTarea').focus();
    }, []);

    const onChange = (e) => {
        setTareas({
            ...tareas,
            [e.target.name]: e.target.value
        });
    };

    const onCheckboxChange = (e) => {
        setTareas({
            ...tareas,
            completada: e.target.checked
        });
    };

    const crearTarea = async () => {
        const data = {
            nombreTarea: tareas.nombreTarea,
            descripcionTarea: tareas.descripcionTarea,
            fechaEntregaTarea: tareas.fechaEntregaTarea,
            completada: tareas.completada,
            proyecto: {
                idProyecto: tareas.proyecto.idProyecto, // Asegúrate de usar la clave exacta que el backend espera.
            }
        };
        

        const response = await APIInvoke.invokePOST('/api/tarea/create', data);
        const idTarea = response.data.idTarea;

        if (!idTarea) {
            const message = 'La tarea no fue creada correctamente';
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
            navigate(`/tareas-admin/${idproyecto}`);
            const message = 'La tarea fue creada correctamente';
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
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        crearTarea();
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Lista de Tareas"}
                    breadCrumb2={"Creación"}
                    ruta1={`/tareas-admin/${idproyecto}`}
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
                                        <label htmlFor="nombreTarea">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombreTarea"
                                            name="nombreTarea"
                                            placeholder="Ingrese el nombre de la tarea"
                                            value={tareas.nombreTarea}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="descripcionTarea">Descripción de la tarea</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="descripcionTarea"
                                            name="descripcionTarea"
                                            placeholder="Ingrese la descripción de la tarea"
                                            value={tareas.descripcionTarea}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fechaEntregaTarea">Fecha de entrega</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="fechaEntregaTarea"
                                            name="fechaEntregaTarea"
                                            value={tareas.fechaEntregaTarea}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="completada">Completada</label>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="completada"
                                            name="completada"
                                            checked={tareas.completada}
                                            onChange={onCheckboxChange}
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Crear</button>
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

export default TareasCrear;
