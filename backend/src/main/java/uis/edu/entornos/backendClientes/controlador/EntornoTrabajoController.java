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

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import uis.edu.entornos.backendClientes.modelo.EntornoTrabajo;
import uis.edu.entornos.backendClientes.servicio.EntornoTrabajoService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/entornoTrabajo")
public class EntornoTrabajoController {
    
    @Autowired
    private EntornoTrabajoService entornoTrabajoService;

    //Listar los entornos de trabajo
    @GetMapping("/list")
    public List<EntornoTrabajo> findAll(){
        return entornoTrabajoService.findAll();
    }

    //Buscar un entorno de trabajo por su id
    @GetMapping("/{id}")
    public ResponseEntity<EntornoTrabajo> findById(@PathVariable("id") Integer idEntorno){
        return entornoTrabajoService.findById(idEntorno)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Crear un entorno de trabajo
    @PostMapping("/")
    public ResponseEntity<EntornoTrabajo> create(@RequestBody EntornoTrabajo entornoTrabajo){
        return new ResponseEntity<>(entornoTrabajoService.create(entornoTrabajo), HttpStatus.CREATED);   
    }

    //Actualizar entorno de trabajo
    @PutMapping("/update")
    public ResponseEntity<EntornoTrabajo> update(@RequestBody EntornoTrabajo entornoTrabajo){
        return entornoTrabajoService.findById(entornoTrabajo.getIdEntorno())
        .map(c -> ResponseEntity.ok(entornoTrabajoService.update(entornoTrabajo)))
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Eliminar entorno de trabajo
    @DeleteMapping("/{id}")
    public ResponseEntity<EntornoTrabajo> delete(@PathVariable("id") Integer idEntorno){
        entornoTrabajoService.delete(idEntorno);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
