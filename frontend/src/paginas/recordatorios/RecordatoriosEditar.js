import React, { useState, useEffect } from 'react';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import Footer from '../../componentes/Footer';
import ContentHeader from '../../componentes/ContentHeader';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';

const RecordatoriosEditar = () => {
    const navigate = useNavigate();
    
    // Obtener el ID del recordatorio desde la URL
    const { idRecordatorio } = useParams();
    
    // Definir el estado inicial del recordatorio
    const [recordatorio, setRecordatorio] = useState({
        mensaje: '',
        fechaRecordatorio: '',
        enviado: false,
        idTarea: '' // ID de la tarea asociada
    });

    const { mensaje, fechaRecordatorio, enviado, idTarea } = recordatorio;

    // Obtener los datos del recordatorio al montar el componente
    useEffect(() => {
        const cargarRecordatorio = async () => {
            const response = await APIInvoke.invokeGET(`/api/recordatorio/${idRecordatorio}`);
            if (response) {
                setRecordatorio({
                    mensaje: response.mensaje,
                    fechaRecordatorio: response.fechaRecordatorio,
                    enviado: response.enviado,
                    idTarea: response.tarea?.idTarea || '' // Obtener el ID de la tarea asociada
                });
            }
        };
        cargarRecordatorio();
    }, [idRecordatorio]);

    // Manejar los cambios en los campos del formulario
    const onChange = (e) => {
        setRecordatorio({
            ...recordatorio,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el cambio del checkbox
    const onCheckboxChange = () => {
        setRecordatorio({
            ...recordatorio,
            enviado: !enviado
        });
    };

    // Editar el recordatorio
    const editarRecordatorio = async () => {
        const data = {
            idRecordatorio, // ID del recordatorio para la actualización
            mensaje,
            fechaRecordatorio,
            enviado,
            tarea: {
                idTarea // Asociar al ID de la tarea ingresado
            }
        };

        const response = await APIInvoke.invokePUT(`/api/recordatorio/update`, data);

        if (response === "Recordatorio actualizado correctamente") {
            swal({
                title: 'Información',
                text: 'Recordatorio actualizado correctamente',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        className: 'btn btn-success',
                    },
                },
            });
            navigate('/recordatorios-admin');
        } else {
            swal({
                title: 'Error',
                text: 'No se pudo actualizar el recordatorio',
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

    // Manejar el submit del formulario
    const onSubmit = (e) => {
        e.preventDefault();
        editarRecordatorio();
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo="Edición de Recordatorios"
                    breadCrumb1="Lista de Recordatorios"
                    breadCrumb2="Edición"
                    ruta1="/recordatorios-admin"
                />
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="mensaje">Mensaje</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mensaje"
                                        name="mensaje"
                                        placeholder="Ingrese el mensaje del recordatorio"
                                        value={mensaje}
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
                                        value={fechaRecordatorio}
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
                                        checked={enviado}
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
                                        value={idTarea}
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

export default RecordatoriosEditar;
