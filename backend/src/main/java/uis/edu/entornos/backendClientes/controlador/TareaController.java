package uis.edu.entornos.backendClientes.controlador;

import java.util.Date;
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
import uis.edu.entornos.backendClientes.modelo.Historial;
//import io.swagger.v3.oas.annotations.parameters.RequestBody;
import uis.edu.entornos.backendClientes.modelo.Tarea;
import uis.edu.entornos.backendClientes.servicio.HistorialService;
import uis.edu.entornos.backendClientes.servicio.TareaService;

/*
Controlador API para controlar la gestión de tareas
(GET, POST, PUT, DELETE)
*/

@RestController
@CrossOrigin("*")
@RequestMapping("/api/tarea")
public class TareaController {
    
    @Autowired
    private TareaService tareaService;
    
    @Autowired
    private HistorialService historialService;

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
    public ResponseEntity<String> update(@RequestBody Tarea tarea) {
            return tareaService.findById(tarea.getIdTarea())
            .map(c -> {
                tareaService.update(tarea); // Actualizamos la tarea
                return ResponseEntity.ok("Tarea actualizado correctamente"); // Respuesta con mensaje
            })
            .orElseGet(() -> ResponseEntity.notFound().build()); // Si no se encuentra la tarea, devolvemos un 404
    }
    
    // Marcar tarea como completada y mover al historial
    @PutMapping("/complete/{id}")
    public ResponseEntity<Object> completarTarea(@PathVariable("id") Integer id) {
        return tareaService.findById(id).map(tarea -> {
            // Marcar la tarea como completada
            tarea.setCompletada(true); // Marcar como completada

            // Actualizar la tarea en la base de datos
            tareaService.update(tarea);

            // Crear un objeto Historial
            Historial historial = new Historial();
            historial.setNombreTarea(tarea.getNombreTarea());
            historial.setDescripcionTarea(tarea.getDescripcionTarea());
            historial.setFechaEntregaTarea(tarea.getFechaEntregaTarea());
            historial.setFechaCompletada(new Date());

            // Guardar en el historial
            historialService.save(historial);

            // Eliminar la tarea de la tabla tarea
            tareaService.delete(id);

            // Retornar una respuesta sin contenido (204 No Content)
            return ResponseEntity.noContent().build(); // Correcto: Retorna ResponseEntity<Void>
        }).orElseGet(() -> ResponseEntity.notFound().build()); // Correcto: Retorna ResponseEntity<Void>
    }

    
    //Eliminar tarea
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable("id") Integer idTarea){
        tareaService.delete(idTarea);

        // Devolver un mensaje de éxito en el cuerpo de la respuesta
        Map<String, String> response = new HashMap<>();
        response.put("message", "Tarea eliminada con éxito");

        return ResponseEntity.ok(response); // Devuelve un código 200 OK con el mensaje
    }

}
