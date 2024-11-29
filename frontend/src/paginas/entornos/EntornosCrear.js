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


const EntornosCrear = () => {

    const navigate = useNavigate();

    const [entorno, setEntorno] = useState({
        nombre_entorno: '',
        cantidad_participantes: 0
    });

    const { nombre_entorno, cantidad_participantes } = entorno;

    useEffect(() => {
        document.getElementById('nombre_entorno').focus();
    }, []);

    const onChange = (e) => {
        setEntorno({
            ...entorno,
            [e.target.name]: e.target.value
        });
    }

    const crearEntorno = async () => {
        const data = {
            nombre_entorno: entorno.nombre_entorno,
            cantidad_participantes: parseInt(entorno.cantidad_participantes)
        }
        const response = await APIInvoke.invokePOST('/crearEntorno', data);
        const idEntorno = response._id;

        if (idEntorno === '') {
            const message = 'El entorno no fue creado correctamente';
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
            navigate("/entornos-admin");
            const message = 'El entorno fue creado correctamente';
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

            setEntorno({
                nombre_entorno: '',
                cantidad_participantes: 0
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearEntorno();
    }


    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Crear/Agregar un Entorno"}
                    breadCrumb1={"Lista de Entornos"}
                    breadCrumb2={"Creación"}
                    ruta1={"/entornos-admin"}
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
                                        <label htmlFor="nombre_entorno">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre_entorno"
                                            name="nombre_entorno"
                                            placeholder="Ingrese el nombre del entorno"
                                            value={nombre_entorno}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cantidad_participantes">Cantidad de Participantes</label>
                                        <input type="number"
                                            className="form-control"
                                            id="cantidad_participantes"
                                            name="cantidad_participantes"
                                            placeholder="Ingrese la cantidad de participantes"
                                            value={cantidad_participantes}
                                            onChange={onChange}
                                            required
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
            <Footer></Footer>
        </div>
    );
}

export default EntornosCrear;