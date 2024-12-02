package uis.edu.entornos.backendClientes.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

/*
Controlador API para controlar la gestión de proyectos
(GET, POST, PUT, DELETE)
*/

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
    public ResponseEntity<String> update(@RequestBody Proyecto proyecto) {
        return proyectoService.findById(proyecto.getIdProyecto())
            .map(c -> {
                proyectoService.update(proyecto); // Actualizamos el proyecto
                return ResponseEntity.ok("Proyecto actualizado correctamente"); // Respuesta con mensaje
            })
            .orElseGet(() -> ResponseEntity.notFound().build()); // Si no se encuentra el proyecto, devolvemos un 404
    }


    //Eliminar entorno de trabajo
@DeleteMapping("/{id}")
public ResponseEntity<Map<String, String>> delete(@PathVariable("id") Integer idProyecto){
    proyectoService.delete(idProyecto);
    
    // Devolver un mensaje de éxito en el cuerpo de la respuesta
    Map<String, String> response = new HashMap<>();
    response.put("message", "Proyecto eliminado con éxito");
    
    return ResponseEntity.ok(response); // Devuelve un código 200 OK con el mensaje
}


}
