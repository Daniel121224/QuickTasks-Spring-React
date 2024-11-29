import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es'; // Opcional: si quieres localizar el calendario en español
import Navbar from '../componentes/Navbar';
import SidebarContainer from '../componentes/SidebarContainer';
import ContentHeader from '../componentes/ContentHeader';
import fondoVerde from '../../node_modules/admin-lte/dist/img/fondoverde.jpg';
import Footer from '../componentes/Footer';

import './Calendario.css';

const localizer = momentLocalizer(moment);

const Calendario = () => {
    const eventos = [
        {
            title: 'Evento 1',
            start: new Date(2024, 6, 10, 10, 0), // Año, mes (base 0), día, hora, minuto
            end: new Date(2024, 6, 10, 12, 0),
        },
        {
            title: 'Evento 2',
            start: new Date(2024, 6, 12, 14, 0),
            end: new Date(2024, 6, 12, 16, 0),
        },
    ];

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper" style={{ backgroundImage: `url(${fondoVerde})`, backgroundSize: 'cover' }}>
                <ContentHeader
                    titulo={"Calendario"}
                    breadCrumb1={"Calendario"}
                />
                <section className="content">
                    <div className="calendar-container" style={{ height: 600 }}>
                        <Calendar
                            localizer={localizer}
                            events={eventos}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ maxWidth: 800, margin: '0 auto' }}
                        />
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Calendario;
