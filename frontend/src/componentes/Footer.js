import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Escuela</b> Ingeniería de Sistemas e Informática
            </div>
            <strong>Universidad Industrial de Santander  | <Link to={"https://uis.edu.co/es/"}>Página UIS</Link>.</strong> 2024
        </footer>
    );
}

export default Footer;