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
        const response = await APIInvoke.invokeGET('/api/proyecto/list');
        setProyectos(response);
    }

    useEffect(() => {
        cargarProyectos();
    }, []);

    const eliminarProyecto = async (e, idProyecto) => {
        e.preventDefault();

        try {
            const response = await APIInvoke.invokeDELETE(`/api/proyecto/${idProyecto}`);

            if (response && response.message === "Proyecto eliminado con éxito") {
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

                setProyectos(proyectos.filter((proyecto) => proyecto.idProyecto !== idProyecto));
            } else {
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

                        <div className="welcome-section text-center mb-4" style={{ marginTop: '10px' }}>
                            <h2 className="text-dark">¡Gestiona tus proyectos o asignaturas📚!</h2>
                            <p className="text-dark">
                                Aquí puedes gestionar tus proyectos o asignaturas para agrupar tus deberes ¡Explora y organiza tu día!
                            </p>
                        </div>

                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/proyectos-crear"} className="btn btn-block btn-primary btn-sm">Agregar Proyecto</Link>
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    proyectos.map((item) => (
                                        <div className="col-md-4" key={item.idProyecto}>
                                            <div className="card mb-4 shadow-sm">
                                                <div className="card-header bg-primary text-white">
                                                    <h5 className="card-title">{item.nombreProyecto}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <p><strong>ID:</strong> {item.idProyecto}</p>
                                                    <p><strong>Progreso:</strong> {item.progreso}%</p>
                                                    <h6>Tareas:</h6>
                                                    <ul>
                                                        {item.tareas.map((tarea) => (
                                                            <li key={tarea.idTarea}>
                                                                {tarea.nombreTarea} - {tarea.descripcionTarea}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Link to={`/tareas-admin/${item.idProyecto}@${item.nombreProyecto}`} className="btn btn-info btn-sm">Ver Tareas</Link>
                                                        <div>
                                                            <button onClick={(e) => eliminarProyecto(e, item.idProyecto)} className="btn btn-danger btn-sm">Eliminar</button>
                                                            <Link to={`/proyectos-editar/${item.idProyecto}`} className="btn btn-primary btn-sm ml-2">Editar</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProyectosAdmin;
