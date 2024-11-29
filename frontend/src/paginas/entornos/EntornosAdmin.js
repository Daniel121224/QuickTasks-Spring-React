import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import fondoVerde from '../../assets/fondoverde.jpg';

const EntornosAdmin = () => {

    const [entornos, setEntornos] = useState([]);

    const cargarEntornos = async () => {
        const response = await APIInvoke.invokeGET('/listarAllEntorno');
        //console.log(response.result);
        setEntornos(response.result);
    }

    useEffect(() => {
        cargarEntornos();
    }, []);

    const eliminarEntorno = async (e, idEntorno) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/eliminarEntorno/${idEntorno}`);

        if (response.message === "Entorno eliminado con éxito") {
            const message = 'El entorno fue eliminado con éxito';
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
                cargarEntornos();
        } else {
            const message = 'No fue posible eliminar el entorno';
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
                    titulo={"Lista de Entornos o Asignaturas"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Entornos"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/entornos-crear"} className="btn btn-block btn-primary btn-sm">Agregar Entorno</Link></h3>
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
                                        <th style={{ width: '55%' }}>Nombre</th>
                                        <th style={{ width: '10%' }}>No. miembros</th>
                                        <th style={{ width: '25%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        entornos.map(
                                            item => 
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre_entorno}</td>
                                                    <td>{item.cantidad_participantes}</td>
                                                    <td>
                                                        <Link to={`/tareas-admin/${item._id}@${item.nombre_entorno}`} className="btn btn-primary btn-info">Tareas</Link>&nbsp; &nbsp;
                                                        <Link to={`/entornos-editar/${item._id}@${item.nombre_entorno}@${item.cantidad_participantes}`} className="btn btn-primary btn-primary">Editar</Link>&nbsp; &nbsp;
                                                        <button  onClick={(e)=> eliminarEntorno(e, item._id)} className="btn btn-primary btn-danger">Borrar</button>
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

export default EntornosAdmin;