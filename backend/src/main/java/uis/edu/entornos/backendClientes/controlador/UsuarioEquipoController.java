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

import uis.edu.entornos.backendClientes.modelo.UsuarioEquipo;
import uis.edu.entornos.backendClientes.servicio.UsuarioEquipoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin("*")
@RequestMapping("/api/usuarioEquipo")
public class UsuarioEquipoController {
    
    @Autowired
    private UsuarioEquipoService usuarioEquipoService;

    //Listar los usuariosEquipos
    @GetMapping("/list")
    public ResponseEntity<List<UsuarioEquipo>> findAll(){
        return ResponseEntity.ok(usuarioEquipoService.findAll());
    }

    //Buscar un usuarioEquipo por su id
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioEquipo> findById(@PathVariable("id") Integer idUsuarioEquipo){
        return usuarioEquipoService.findById(idUsuarioEquipo)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Crear un usuarioEquipo
    @PostMapping
    public ResponseEntity<UsuarioEquipo> create(@RequestBody UsuarioEquipo usuarioEquipo){
        return new ResponseEntity<>(usuarioEquipoService.create(usuarioEquipo), HttpStatus.CREATED);   
    }

    //Actualizar usuarioEquipo
    @PutMapping
    public ResponseEntity<UsuarioEquipo> update(@RequestBody UsuarioEquipo usuarioEquipo){
        return usuarioEquipoService.findById(usuarioEquipo.getIdUsuarioEquipo())
        .map(c -> ResponseEntity.ok(usuarioEquipoService.update(usuarioEquipo)))
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Eliminar usuarioEquipo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        usuarioEquipoService.delete(id);
        return ResponseEntity.ok().build();
    }

    
}
