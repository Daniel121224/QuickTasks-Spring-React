package uis.edu.entornos.backendClientes.controlador;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uis.edu.entornos.backendClientes.modelo.Recordatorio;
import uis.edu.entornos.backendClientes.servicio.RecordatorioService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/recordatorio")
public class RecordatorioController {

    @Autowired
    private RecordatorioService recordatorioService;

    // Listar todos los recordatorios
    @GetMapping("/list")
    public List<Recordatorio> findAll() {
        return recordatorioService.findAll();
    }

    // Buscar un recordatorio por ID
    @GetMapping("/{id}")
    public ResponseEntity<Recordatorio> findById(@PathVariable("id") Integer idRecordatorio) {
        return recordatorioService.findById(idRecordatorio)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo recordatorio
    @PostMapping("/create")
    public ResponseEntity<Recordatorio> create(@RequestBody Recordatorio recordatorio) {
        return new ResponseEntity<>(recordatorioService.create(recordatorio), HttpStatus.CREATED);
    }

    // Actualizar un recordatorio existente
    @PutMapping("/update")
    public ResponseEntity<Recordatorio> update(@RequestBody Recordatorio recordatorio) {
        return recordatorioService.findById(recordatorio.getIdRecordatorio())
            .map(r -> ResponseEntity.ok(recordatorioService.update(recordatorio)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar un recordatorio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer idRecordatorio) {
        recordatorioService.delete(idRecordatorio);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
