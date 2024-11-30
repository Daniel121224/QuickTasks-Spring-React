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

import uis.edu.entornos.backendClientes.modelo.LoginDto;
import uis.edu.entornos.backendClientes.modelo.Usuario;
import uis.edu.entornos.backendClientes.servicio.UsuarioService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/usuario")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    //Listar los usuarios
    @GetMapping("/list")
    public List<Usuario> findAll(){
        return usuarioService.findAll();
    }

    //Buscar un usuario por su id
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable("id") Integer idUsuario){
        return usuarioService.findById(idUsuario)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Crear un usuario
    @PostMapping("/create")
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario){
        return new ResponseEntity<>(usuarioService.create(usuario), HttpStatus.CREATED);   
    }

    @PostMapping("/loginclient")
    public int login(@RequestBody LoginDto usuario){
        int responseLogin = usuarioService.login(usuario);
        return responseLogin;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCliente(@RequestBody LoginDto usuario){
        return usuarioService.ingresar(usuario);
    }

    //Actualizar usuario
    @PutMapping("/update")
    public ResponseEntity<Usuario> update(@RequestBody Usuario usuario){
        return usuarioService.findById(usuario.getIdUsuario())
        .map(c -> ResponseEntity.ok(usuarioService.update(usuario)))
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Usuario> delete(@PathVariable("id") Integer idUsuario){
        usuarioService.delete(idUsuario);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
