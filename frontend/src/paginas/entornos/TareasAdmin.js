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

    const { identorno } = useParams();
    let arreglo = identorno.split('@');
    const idEntorno = arreglo[0];
    const nombreEntorno = arreglo[1];
    const cantidadParticipantes = arreglo[2];
    const tituloPagina = `Tareas del Entorno: ${nombreEntorno}`;

    const cargarTareas = async () => {
        const response = await APIInvoke.invokeGET(`/listarAllTarea?entorno=${idEntorno}`);
        //console.log(response.tareas);
        setTareas(response.tareas);
    }

    useEffect(() => {
        cargarTareas();
    }, []);

    const eliminarTarea = async (e, idTarea, idEntorno) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/eliminarTarea/${idTarea}?entorno=${idEntorno}`);

        if (response.message === "Tarea eliminada con éxito") {
            const message = 'La tarea fue eliminada con éxito';
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
            cargarTareas();
        } else {
            const message = 'No fue posible eliminar la tarea';
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
        }
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper" style={{ backgroundImage: `url(${fondoVerde})`, backgroundSize: 'cover' }}>

                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Lista de Entornos"}
                    breadCrumb2={"Tareas"}
                    ruta1={"/entornos-admin"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={`/tareas-crear/${identorno}`} className="btn btn-block btn-primary btn-sm">Agregar Tarea</Link></h3>
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
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '20%' }}>Nombre</th>
                                        <th style={{ width: '20%' }}>Clasificación</th>
                                        <th style={{ width: '30%' }}>Descripción</th>
                                        <th style={{ width: '20%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        tareas.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre_tarea}</td>
                                                    <td>{item.clasificacion_tarea}</td>
                                                    <td>{item.descripcion_tarea}</td>
                                                    <td>
                                                        <Link to={`/tareas-editar/${item._id}@${item.nombre_tarea}@${item.clasificacion_tarea}@${item.descripcion_tarea}@${item.entorno}@${nombreEntorno}`} className="btn btn-primary btn-primary">Editar</Link>&nbsp; &nbsp;
                                                        <button onClick={(e) => eliminarTarea(e, item._id, item.entorno)} className="btn btn-primary btn-danger">Borrar</button>
                                                    </td>
                                                </tr>
                                        )
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

export default TareasAdmin;