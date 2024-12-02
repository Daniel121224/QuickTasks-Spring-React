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

const ProyectosCrear = () => {
    const navigate = useNavigate();

    const [proyecto, setProyecto] = useState({
        nombreProyecto: '',
        progreso: 0,
    });

    const { nombreProyecto, progreso } = proyecto;

    useEffect(() => {
        document.getElementById('nombreProyecto').focus();
    }, []);

    const onChange = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        });
    };

    const crearProyecto = async () => {
        const data = {
            nombreProyecto: proyecto.nombreProyecto,
            progreso: parseInt(proyecto.progreso),
        };

        const response = await APIInvoke.invokePOST('/api/proyecto/create', data);

        if (response && response.idProyecto) {
            swal({
                title: 'Información',
                text: 'El proyecto fue creado correctamente',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-success',
                    },
                },
            });
            navigate('/proyectos-admin');

            setProyecto({
                nombreProyecto: '',
                progreso: 0,
            });
        } else {
            swal({
                title: 'Error',
                text: 'El proyecto no fue creado correctamente',
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

    const onSubmit = (e) => {
        e.preventDefault();
        crearProyecto();
    };

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Crear/Agregar un Proyecto"}
                    breadCrumb1={"Lista de Proyectos"}
                    breadCrumb2={"Creación"}
                    ruta1={"/proyectos-admin"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                    title="Collapse"
                                >
                                    <i className="fas fa-minus" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                    title="Remove"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
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
                                        <label htmlFor="progreso">Progreso (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="progreso"
                                            name="progreso"
                                            placeholder="Ingrese el progreso del proyecto"
                                            value={progreso}
                                            onChange={onChange}
                                            min="0"
                                            max="100"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Crear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ProyectosCrear;
