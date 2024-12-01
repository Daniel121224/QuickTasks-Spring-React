package uis.edu.entornos.backendClientes.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import uis.edu.entornos.backendClientes.modelo.Historial;
import uis.edu.entornos.backendClientes.servicio.IHistorialService;

import java.util.List;

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
