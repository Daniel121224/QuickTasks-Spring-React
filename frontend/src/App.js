import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CrearCuenta from './paginas/auth/CrearCuenta';
import Login from './paginas/auth/Login';
import Home from './paginas/Home';
import ProyectosAdmin from './paginas/proyectos/ProyectosAdmin';
import ProyectosCrear from './paginas/proyectos/ProyectosCrear';
import ProyectosEditar from './paginas/proyectos/ProyectosEditar';
import TareasAdmin from './paginas/proyectos/TareasAdmin';
import TareasCrear from './paginas/proyectos/TareasCrear';
import TareasEditar from './paginas/proyectos/TareasEditar';

import AllTareasAdmin from './paginas/tareas/AllTareasAdmin';

import RecordatoriosAdmin from './paginas/recordatorios/RecordatoriosAdmin';
import Calendario from './componentes/Calendario';
//import EquiposAdmin from './paginas/equipos/EquiposAdmin';
//import EquiposCrear from './paginas/equipos/EquiposCrear';
//import EquiposEditar from './paginas/equipos/EquiposEditar';
import Acerca from './componentes/Acerca';

/*
          <Route path="/equipos-admin" exact element={<EquiposAdmin/>}/>
          <Route path="/equipos-crear" exact element={<EquiposCrear/>}/>
          <Route path="/equipos-editar/:identorno" exact element={<EquiposEditar/>}/>
*/

function App() {


  
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/proyectos-admin" exact element={<ProyectosAdmin/>}/>
          <Route path="/proyectos-crear" exact element={<ProyectosCrear/>}/>
          <Route path="/proyectos-editar/:idProyecto" exact element={<ProyectosEditar/>}/>

          <Route path="/tareas-admin/:idProyecto" exact element={<TareasAdmin/>}/>
          <Route path="/tareas-crear/:idProyecto" exact element={<TareasCrear/>}/>
          <Route path="/tareas-editar/:idTarea" exact element={<TareasEditar/>}/>

          <Route path="/all-tareas-admin" exact element={<AllTareasAdmin/>}/>

          <Route path="/recordatorios-admin" exact element={<RecordatoriosAdmin/>}/>

          <Route path="/calendario" exact element={<Calendario/>}/>
          
          <Route path="/acerca" exact element={<Acerca/>}/>

        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
