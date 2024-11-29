import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CrearCuenta = () => {

    const [usuario, setUsuario] = useState({
        nombre: '',
        correo: '',
        documento: '',
        contrasena: '',
        confirmar: ''
    });

    const { nombre, correo, documento, contrasena, confirmar } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        document.getElementById('nombre').focus();
    }, []);

    const CrearCuenta = async () => {

        if (contrasena !== confirmar) {
            const message = 'Las contraseñas no coinciden';
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
        } else if (contrasena.length < 6) {
            const message = 'La contraseña debe al menos de 6 caracteres';
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
            const data = {
                nombre: usuario.nombre,
                correo: usuario.correo,
                documento: usuario.documento,
                contrasena: usuario.contrasena
            }
            const response = await APIInvoke.invokePOST('/crearUsuario', data);
            const mensaje = response.message;
            console.log(mensaje);

            if (mensaje === 'El correo electrónico ya está registrado') {
                const message = 'El correo electrónico ya está registrado';
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
                const message = 'Usuario creado correctamente';
                swal({
                    title: 'Éxito',
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

                setUsuario({
                    nombre: '',
                    correo: '',
                    documento: '',
                    contrasena: '',
                    confirmar: ''
                });
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        CrearCuenta();
    }


    return (
        <div>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <Link to={"#"}><b>Crear</b> Cuenta</Link>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Ingrese sus datos de usuario</p>
                            <form onSubmit={onSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="nombre"
                                        name="nombre"
                                        value={nombre}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user" />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="email"
                                        className="form-control"
                                        placeholder="Correo"
                                        id="correo"
                                        name="correo"
                                        value={correo}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Documento"
                                        id="documento"
                                        name="documento"
                                        value={documento}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-hashtag" />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        id="contrasena"
                                        name="contrasena"
                                        value={contrasena}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="password"
                                        className="form-control"
                                        placeholder="Confirmar Contraseña"
                                        id="confirmar"
                                        name="confirmar"
                                        value={confirmar}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>

                                <div className="social-auth-links text-center mb-3">
                                    <button type='submit' className="btn btn-block btn-primary">
                                        Crear Cuenta
                                    </button>
                                    <Link to={"/"} className="btn btn-block btn-danger">
                                        Regresar al Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearCuenta;