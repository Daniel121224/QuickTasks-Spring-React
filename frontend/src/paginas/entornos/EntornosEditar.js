import React from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import { useState } from 'react';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EntornosEditar = () => {

    const navigate = useNavigate();

    const { identorno } = useParams();
    let arreglo = identorno.split('@');
    const nombreEntorno = arreglo[1];
    const cantidadParticipantes = arreglo[2];

    const [entorno, setEntorno] = useState({
        nombre_entorno: nombreEntorno,
        cantidad_participantes: cantidadParticipantes
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

    const editarEntorno = async () => {
        let arreglo = identorno.split('@');
        const idEntorno = arreglo[0];

        const data = {
            nombre_entorno: entorno.nombre_entorno,
            cantidad_participantes: parseInt(entorno.cantidad_participantes)
        }

        const response = await APIInvoke.invokePUT(`/actualizarEntorno/${idEntorno}`, data);
        const idEntornoEditado = response.data._id;

        if (idEntornoEditado !== idEntorno) {
            const message = 'El entorno no fue editado correctamente';
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
            const message = 'El entorno fue editado correctamente';
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
    const onSubmit = (e) => {
        e.preventDefault();
        editarEntorno();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Edición de Entornos"}
                    breadCrumb1={"Lista de Entornos"}
                    breadCrumb2={"Edición"}
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
                                    <button type="submit" className="btn btn-primary">Editar</button>
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

export default EntornosEditar;