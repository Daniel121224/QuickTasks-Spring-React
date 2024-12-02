import React from 'react';
import Navbar from '../componentes/Navbar';
import SidebarContainer from '../componentes/SidebarContainer';
import ContentHeader from '../componentes/ContentHeader';
import Footer from '../componentes/Footer';
import { Link } from 'react-router-dom';
import fondoVerde from '../../node_modules/admin-lte/dist/img/fondoverde.jpg';


const Home = () => {
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper" style={{ backgroundImage: `url(${fondoVerde})`, backgroundSize: 'cover' }}>

                <ContentHeader
                    titulo={"Acceso rápido"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">

                            <div class="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>Proyectos</h3>
                                        <p>Asignaturas o áreas</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-edit" />
                                    </div>
                                    <Link to={"/proyectos-admin"} className="small-box-footer">Ver Proyectos <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-primary">
                                    <div className="inner">
                                        <h3>Tareas</h3>
                                        <p>Tareas sin agrupar</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-users" />
                                    </div>
                                    <Link to={"/equipos-admin"} className="small-box-footer">Ver Equipos <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                            

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>Calendario</h3>
                                        <p>Planifica tu tiempo</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-calendar-alt" />
                                    </div>
                                    <Link to={"/equipos-admin"} className="small-box-footer">Ver Calendario <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;