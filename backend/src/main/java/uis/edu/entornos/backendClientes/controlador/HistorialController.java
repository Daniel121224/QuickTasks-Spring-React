package uis.edu.entornos.backendClientes.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import uis.edu.entornos.backendClientes.modelo.Historial;
import uis.edu.entornos.backendClientes.servicio.IHistorialService;

import java.util.List;

/*
Controlador API para el historial de las tareas completadas
su función es solo mostrar tareas completadas, por tanto solo Get
*/

@RestController
@RequestMapping("/api/historial")
@CrossOrigin("*")
public class HistorialController {

    @Autowired
    private IHistorialService historialService;

    @GetMapping("/list")
    public List<Historial> findAll() {
        return historialService.findAll();
    }
}
