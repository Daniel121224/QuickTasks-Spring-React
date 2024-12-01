package uis.edu.entornos.backendClientes.controlador;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uis.edu.entornos.backendClientes.modelo.LoginDto;
import uis.edu.entornos.backendClientes.modelo.Usuario;
import uis.edu.entornos.backendClientes.repositorio.IUsuarioRepository;

/*
Este controlador recibe las solicitudes de inicio de sesión con el LoginDto 
y llama al AuthService para validar las credenciales del usuario.
*/

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IUsuarioRepository usuarioRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpSession session) {
        Usuario usuario = usuarioRepo.findByNameAndPassword(loginDto.getNombreUsuario(), loginDto.getContrasena());
        if (usuario != null) {
            session.setAttribute("usuario", usuario); // Guarda el usuario en la sesión
            return ResponseEntity.ok("Inicio de sesión exitoso");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // Invalida la sesión
        return ResponseEntity.ok("Sesión cerrada exitosamente");
    }
}
