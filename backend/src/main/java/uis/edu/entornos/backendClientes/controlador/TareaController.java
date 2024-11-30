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
import uis.edu.entornos.backendClientes.modelo.Tarea;
import uis.edu.entornos.backendClientes.servicio.TareaService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/tarea")
public class TareaController {
    
    @Autowired
    private TareaService tareaService;

    //Listar las tareas
    @GetMapping("/list")
    public List<Tarea> findAll(){
        return tareaService.findAll();
    }

    //Buscar una tarea por su id
    @GetMapping("/{id}")
    public ResponseEntity<Tarea> findById(@PathVariable("id") Integer idTarea){
        return tareaService.findById(idTarea)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Crear una tarea
    @PostMapping("/create")
    public ResponseEntity<Tarea> create(@RequestBody Tarea tarea){
        return new ResponseEntity<>(tareaService.create(tarea), HttpStatus.CREATED);   
    }

    //Actualizar tarea
    @PutMapping("/update")
    public ResponseEntity<Tarea> update(@RequestBody Tarea tarea){
        return tareaService.findById(tarea.getIdTarea())
        .map(c -> ResponseEntity.ok(tareaService.update(tarea)))
        .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    //Eliminar tarea
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        tareaService.delete(id);
        return ResponseEntity.ok().build();
    }
}
