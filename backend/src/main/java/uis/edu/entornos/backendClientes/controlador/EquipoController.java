package uis.edu.entornos.backendClientes.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uis.edu.entornos.backendClientes.modelo.Equipo;
import uis.edu.entornos.backendClientes.servicio.EquipoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/equipo")
public class EquipoController {
    
    @Autowired
    private EquipoService equipoService;

    //Listar los equipos
    @GetMapping("/list")
    public List<Equipo> findAll(){
        return equipoService.findAll();
    }

    //Buscar un equipo por su id
    @GetMapping("/{id}")
    public ResponseEntity<Equipo> findById(@PathVariable("id") Integer idEquipo){
        return equipoService.findById(idEquipo)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Crear un equipo
    @PostMapping("/l")
    public ResponseEntity<Equipo> create(@RequestBody Equipo equipo){
        return new ResponseEntity<>(equipoService.create(equipo), HttpStatus.CREATED);
    }

    //Actualizar equipo
    @PutMapping("/l")
    public ResponseEntity<Equipo> update(@RequestBody Equipo equipo){
        return equipoService.findById(equipo.getIdEquipo())
        .map(c -> ResponseEntity.ok(equipoService.update(equipo)))
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Eliminar equipo
    @DeleteMapping("/{id}")
    public ResponseEntity<Equipo> delete(@PathVariable("id") Integer idEquipo){
        equipoService.delete(idEquipo);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
