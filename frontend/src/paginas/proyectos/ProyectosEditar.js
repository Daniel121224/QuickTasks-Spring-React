import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';

const ProyectosEditar = () => {
    const navigate = useNavigate();
    
    // Obtener el ID del proyecto desde la URL
    const { idProyecto } = useParams();
    
    // Definir el estado inicial del proyecto
    const [proyecto, setProyecto] = useState({
        nombreProyecto: '',
        progreso: 0
    });
    
    const { nombreProyecto, progreso } = proyecto;

    // Obtener los datos del proyecto cuando el componente se monta
    useEffect(() => {
        const cargarProyecto = async () => {
            const response = await APIInvoke.invokeGET(`/api/proyecto/${idProyecto}`);
            if (response) {
                setProyecto({
                    nombreProyecto: response.nombreProyecto,
                    progreso: response.progreso
                });
            }
        };
        cargarProyecto();
    }, [idProyecto]);

    // Función para manejar los cambios en los campos de entrada
    const onChange = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    };

    // Función para editar el proyecto
    const editarProyecto = async () => {
        const data = {
            idProyecto: idProyecto, // Asegúrate de incluir el id del proyecto
            nombreProyecto: proyecto.nombreProyecto,
            progreso: proyecto.progreso
        };

        const response = await APIInvoke.invokePUT(`/api/proyecto/update`, data);

        if (response === "Proyecto actualizado correctamente") {
            swal({
                title: 'Información',
                text: 'Proyecto actualizado correctamente',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-success',
                    },
                },
            });
            navigate('/proyectos-admin');
        } else {
            swal({
                title: 'Error',
                text: 'No se pudo actualizar el proyecto',
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
        editarProyecto();
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo="Edición de Proyectos"
                    breadCrumb1="Lista de Proyectos"
                    breadCrumb2="Edición"
                    ruta1="/proyectos-admin"
                />
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nombreProyecto">Nombre del Proyecto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombreProyecto"
                                        name="nombreProyecto"
                                        placeholder="Ingrese el nombre del proyecto"
                                        value={nombreProyecto}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="progreso">Progreso</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="progreso"
                                        name="progreso"
                                        placeholder="Ingrese el progreso"
                                        value={progreso}
                                        onChange={onChange}
                                        required
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

export default ProyectosEditar;
