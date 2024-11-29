package uis.edu.entornos.backendClientes.servicio;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.LoginDto;
import uis.edu.entornos.backendClientes.modelo.Usuario;
import uis.edu.entornos.backendClientes.repositorio.IUsuarioRepository;

@Service
public class UsuarioService implements IUsuarioService{

    @Autowired
    private IUsuarioRepository usuarioRepo;

    @Override
    public List<Usuario> findAll() {
        return usuarioRepo.findAll();
    }

    @Override
    public Optional<Usuario> findById(Integer id) {
        return usuarioRepo.findById(id);
    }

    @Override
    public Usuario create(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    @Override
    public Usuario update(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    @Override
    public void delete(Integer id) {
        usuarioRepo.deleteById(id);
    }

    public int login(LoginDto usuarioDto) {
        int u = usuarioRepo.findByNombreUsuarioAndPassword(usuarioDto.getNombreUsuario(), usuarioDto.getContraseña());
        return u;
    }

    public ResponseEntity<?> ingresar(LoginDto usuarioDto) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuario = null;
        try{
            usuario = usuarioRepo.findByNameAndPassword(usuarioDto.getNombreUsuario(), usuarioDto.getContraseña());
            if(usuario == null){
                response.put("Usuario", null);
                response.put("Mensaje", "Alerta:Usuario o Password incorrectos");
                response.put("statusCode", HttpStatus.NOT_FOUND.value());
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            else{
                response.put("Usuario", usuario);
                response.put("Mensaje", "Datos correctos");
                response.put("statusCode", HttpStatus.OK.value());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (Exception e){
            response.put("Usuario", null);
            response.put("Mensaje", "Ha ocurrido un error");
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
