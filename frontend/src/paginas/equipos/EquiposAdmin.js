import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import fondoVerde from '../../assets/fondoverde.jpg';

const EquiposAdmin = () => {

    const [equipos, setEquipo] = useState([]);

    const cargarEquipos = async () => {
        const response = await APIInvoke.invokeGET('/listarAllEquipo');
        //console.log(response.result);
        setEquipo(response.result);
    }

    useEffect(() => {
        cargarEquipos();
    }, []);

    const eliminarEquipo = async (e, idEquipo) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/eliminarEquipo/${idEquipo}`);

        if (response.message === "Equipo eliminado con éxito") {
            const message = 'El Equipo fue eliminado con éxito';
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
            cargarEquipos();
        } else {
            const message = 'No fue posible eliminar el Equipo';
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
                    titulo={"Lista de Equipos de Trabajo"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Equipos"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/equipos-crear"} className="btn btn-block btn-primary btn-sm">Agregar Equipo</Link></h3>
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
                                        <th style={{ width: '25%' }}>Nombre</th>
                                        <th style={{ width: '30%' }}>Integrantes</th>
                                        <th style={{ width: '10%' }}>Metodologia</th>
                                        <th style={{ width: '25%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        equipos.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre_equipo}</td>
                                                    <td>{item.integrantes}</td>
                                                    <td>{item.metodologia}</td>
                                                    <td>
                                                    <button className="btn btn-primary btn-primary">Editar</button> &nbsp; &nbsp; 
                                                        <button className="btn btn-primary btn-danger">Borrar</button>
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

export default EquiposAdmin;