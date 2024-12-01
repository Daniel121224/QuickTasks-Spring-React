import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import fondoVerde from '../../assets/fondoverde.jpg';

const ProyectosAdmin = () => {

    const [proyectos, setProyectos] = useState([]);

    const cargarProyectos = async () => {
        const response = await APIInvoke.invokeGET('/api/proyecto/list'); // Cambié la ruta a /api/proyecto/list
        setProyectos(response); // Aquí asumo que el API devuelve directamente el array de proyectos
    }

    useEffect(() => {
        cargarProyectos();
    }, []);

    const eliminarProyecto = async (e, idProyecto) => {
        e.preventDefault();
    
        try {
            // Enviar la solicitud DELETE y obtener la respuesta
            const response = await APIInvoke.invokeDELETE(`/api/proyecto/${idProyecto}`);
            console.log("Respuesta de la API:", response); // Verificamos qué devuelve la API
    
            // Si la respuesta tiene la estructura esperada
            if (response && response.message === "Proyecto eliminado con éxito") {
                // Mostrar mensaje de éxito
                swal({
                    title: 'Información',
                    text: 'El proyecto fue eliminado con éxito',
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
    
                // Actualizar la lista de proyectos eliminando el proyecto de la lista
                setProyectos(proyectos.filter((proyecto) => proyecto.idProyecto !== idProyecto));
    
            } else {
                // Si la respuesta no es como se esperaba, mostrar mensaje de error
                console.error("Error al eliminar proyecto: respuesta inesperada", response);
                swal({
                    title: 'Error',
                    text: 'No fue posible eliminar el proyecto',
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
            }
        } catch (error) {
            // Manejo de errores: mostrar en consola el error real
            console.error("Error en la solicitud DELETE:", error);
            swal({
                title: 'Error',
                text: 'Hubo un problema al eliminar el proyecto. Intenta nuevamente.',
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
        }
    }
    

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper" style={{ backgroundImage: `url(${fondoVerde})`, backgroundSize: 'cover' }}>

                <ContentHeader
                    titulo={"Lista de Proyectos"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Proyectos"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/proyectos-crear"} className="btn btn-block btn-primary btn-sm">Agregar Proyecto</Link></h3>
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
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre del Proyecto</th>
                                        <th>Progreso</th>
                                        <th>Tareas</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        proyectos.map((item) => (
                                            <tr key={item.idProyecto}>
                                                <td>{item.idProyecto}</td>
                                                <td>{item.nombreProyecto}</td>
                                                <td>{item.progreso}%</td>
                                                <td>
                                                    <ul>
                                                        {item.tareas.map((tarea) => (
                                                            <li key={tarea.idTarea}>
                                                                {tarea.nombreTarea} - {tarea.descripcionTarea}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <Link to={`/tareas-admin/${item.idProyecto}@${item.nombreProyecto}`} className="btn btn-info">Ver Tareas</Link>
                                                    <button onClick={(e) => eliminarProyecto(e, item.idProyecto)} className="btn btn-danger">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                  
                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProyectosAdmin;
