import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                            Inicio
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/proyectos-admin"} className="nav-link">
                        <i className="nav-icon fas fa-edit" />
                        <p>
                            Proyectos
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/all-tareas-admin"} className="nav-link">
                        <i className="nav-icon fas fa-business-time"></i>
                        <p>Tareas</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/calendario"} className="nav-link">
                        <i className="nav-icon fas fa-clock"></i>
                        <p>Historial</p>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={"/recordatorios-admin"} className="nav-link">
                        <i className="nav-icon fas fa-bell"></i>
                        <p>Recordatorios</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/calendario"} className="nav-link">
                        <i className="nav-icon far fa-calendar-alt"></i>
                        <p>Calendario</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/acerca"} className="nav-link">
                        <i className="nav-icon fas fa-info-circle"></i>
                        <p>Acerca de</p>
                    </Link>
                </li>

            </ul>
        </nav>

    );
}

export default Menu;