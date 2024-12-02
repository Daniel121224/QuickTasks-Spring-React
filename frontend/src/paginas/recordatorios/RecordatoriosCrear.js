import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const RecordatoriosCrear = () => {
    const navigate = useNavigate();
    const [recordatorio, setRecordatorio] = useState({
        mensaje: '',
        fechaRecordatorio: '',
        enviado: false,
        idTarea: '', // ID de la tarea a asociar, ingresado por el usuario
    });

    const tituloPagina = `Crear Recordatorio`;

    useEffect(() => {
        document.getElementById('mensaje').focus();
    }, []);

    const onChange = (e) => {
        setRecordatorio({
            ...recordatorio,
            [e.target.name]: e.target.value
        });
    };

    const onCheckboxChange = (e) => {
        setRecordatorio({
            ...recordatorio,
            enviado: e.target.checked
        });
    };

    const crearRecordatorio = async () => {
        const data = {
            mensaje: recordatorio.mensaje,
            fechaRecordatorio: recordatorio.fechaRecordatorio,
            enviado: recordatorio.enviado,
            tarea: {
                idTarea: recordatorio.idTarea, // Asociar con la tarea ingresada
            }
        };

        const response = await APIInvoke.invokePOST('/api/recordatorio/create', data);

        if (!response || response.status !== 201) {
            swal({
                title: 'Error',
                text: 'El recordatorio no fue creado correctamente',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-danger',
                    }
                }
            });
        } else {
            navigate('/recordatorios-admin');
            swal({
                title: 'Información',
                text: 'El recordatorio fue creado correctamente',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-success',
                    }
                }
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await crearRecordatorio();
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Lista de Recordatorios"}
                    breadCrumb2={"Creación"}
                    ruta1={"/recordatorios-admin"}
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
                                        <label htmlFor="mensaje">Mensaje</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="mensaje"
                                            name="mensaje"
                                            placeholder="Ingrese el mensaje del recordatorio"
                                            value={recordatorio.mensaje}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fechaRecordatorio">Fecha del Recordatorio</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="fechaRecordatorio"
                                            name="fechaRecordatorio"
                                            value={recordatorio.fechaRecordatorio}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enviado">¿Enviado?</label>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="enviado"
                                            name="enviado"
                                            checked={recordatorio.enviado}
                                            onChange={onCheckboxChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="idTarea">ID de la Tarea</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="idTarea"
                                            name="idTarea"
                                            placeholder="Ingrese el ID de la tarea asociada"
                                            value={recordatorio.idTarea}
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
            <Footer />
        </div>
    );
};

export default RecordatoriosCrear;
