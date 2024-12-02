import React from 'react';
import Navbar from '../componentes/Navbar';
import SidebarContainer from '../componentes/SidebarContainer';
import ContentHeader from '../componentes/ContentHeader';
import Footer from '../componentes/Footer';
import fondoVerde from '../../node_modules/admin-lte/dist/img/fondoverde.jpg';
import Logo2 from '../../node_modules/admin-lte/dist/img/logo2.png'; // Asegúrate de que la ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faUser, faUniversity, faBook, faServer, faDesktop } from '@fortawesome/free-solid-svg-icons';

const Acerca = () => {
    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper" style={{ backgroundImage: `url(${fondoVerde})`, backgroundSize: 'cover' }}>
                <ContentHeader
                    titulo={"Acerca de la Aplicación"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Acerca"}
                    ruta1={"/home"}
                />
                <section className="content">
                    <div className="card">
                    <div className="card-header text-center">
                            <img src={Logo2} alt="Logo" style={{ width: '50px'}} />
                            <h4 className="card-title">Logotipo</h4>
                        </div>
                        <div className="card-body">
                            <div className="section">
                                <h4>
                                    <FontAwesomeIcon icon={faBullseye} /> Objetivo de la aplicación:
                                </h4>
                                <p>Aplicativo web que permite la organización de tareas clasificándolas por asignaturas, entornos, tareas y equipos, con accesorios para la correcta organización de deberes.</p>
                            </div>
                            <hr />
                            <div className="section">
                                <h4>
                                    <FontAwesomeIcon icon={faUser} /> Desarrolladores:
                                </h4>
                                <ul>
                                    <li>
                                        <strong>Jorge Daniel Robles Ardila - 2210065</strong>
                                        <br /> roblesardilajorgedaniel@gmail.com
                                        <br /> Estudiante de Ingeniería de Sistemas
                                    </li>
                                    <li>
                                        <strong>Manuela Alejandra García Valbuena - 2211922</strong>
                                        <br /> mg2472493@gmail.com
                                        <br /> Estudiante de Ingeniería de Sistemas
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div className="section">
                                <h4>
                                    <FontAwesomeIcon icon={faUniversity} /> Universidad Industrial de Santander
                                </h4>
                                <p>
                                    Escuela de Ingeniería de Sistemas e Informática
                                    <br /> Bucaramanga, Santander, Colombia
                                </p>
                            </div>
                            <hr />
                            <div className="section">
                                <h4>
                                    <FontAwesomeIcon icon={faBook} /> Materia:
                                </h4>
                                <p>
                                    Ingeniería de Software - D1
                                    <br /> Profesor: Fernando Rojas
                                </p>
                            </div>
                            <hr />
                            <div className="section">
                                <h4>
                                    <FontAwesomeIcon icon={faServer} /> Backend:
                                </h4>
                                <ul>
                                    <li>Spring Boot</li>
                                    <li>Dbeaver/HeidiSQL</li>
                                </ul>
                            </div>
                            <hr />
                            <div className="section">
                                <h4>
                                    <FontAwesomeIcon icon={faDesktop} /> Frontend:
                                </h4>
                                <ul>
                                    <li>React</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Acerca;
