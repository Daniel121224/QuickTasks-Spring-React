package uis.edu.entornos.backendClientes.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;
//import io.swagger.v3.oas.annotations.parameters.RequestBody;
import uis.edu.entornos.backendClientes.modelo.Proyecto;
import uis.edu.entornos.backendClientes.servicio.ProyectoService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/proyecto")
public class ProyectoController {
    
    @Autowired
    private ProyectoService proyectoService;

    //Listar los Proyecto
    @GetMapping("/list")
    public List<Proyecto> findAll(){
        return proyectoService.findAll();
    }

    //Buscar un Proyecto por su id
    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> findById(@PathVariable("id") Integer idProyecto){
        return proyectoService.findById(idProyecto)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Crear un proyecto
    @PostMapping("/create")
    public ResponseEntity<Proyecto> create(@RequestBody Proyecto proyecto){
        return new ResponseEntity<>(proyectoService.create(proyecto), HttpStatus.CREATED);   
    }

    //Actualizar proyecto
    @PutMapping("/update")
    public ResponseEntity<Proyecto> update(@RequestBody Proyecto proyecto){
        return proyectoService.findById(proyecto.getIdProyecto())
        .map(c -> ResponseEntity.ok(proyectoService.update(proyecto)))
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Eliminar entorno de trabajo
    @DeleteMapping("/{id}")
    public ResponseEntity<Proyecto> delete(@PathVariable("id") Integer idProyecto){
        proyectoService.delete(idProyecto);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
