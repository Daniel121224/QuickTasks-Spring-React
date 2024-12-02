package uis.edu.entornos.backendClientes.servicio;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import uis.edu.entornos.backendClientes.modelo.Usuario;
import uis.edu.entornos.backendClientes.repositorio.IUsuarioRepository;

class UsuarioServiceTest {

    @Mock
    private IUsuarioRepository usuarioRepo;

    @InjectMocks
    private UsuarioService usuarioService;

    public UsuarioServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        Usuario usuario1 = new Usuario();
        usuario1.setIdUsuario(1);
        usuario1.setNombre("Usuario 1");

        Usuario usuario2 = new Usuario();
        usuario2.setIdUsuario(2);
        usuario2.setNombre("Usuario 2");

        when(usuarioRepo.findAll()).thenReturn(Arrays.asList(usuario1, usuario2));

        List<Usuario> usuarios = usuarioService.findAll();
        assertEquals(2, usuarios.size());
        assertEquals("Usuario 1", usuarios.get(0).getNombre());
        verify(usuarioRepo, times(1)).findAll();
    }

    @Test
    void testFindById() {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombre("Usuario 1");

        when(usuarioRepo.findById(1)).thenReturn(Optional.of(usuario));

        Optional<Usuario> result = usuarioService.findById(1);
        assertTrue(result.isPresent());
        assertEquals("Usuario 1", result.get().getNombre());
        verify(usuarioRepo, times(1)).findById(1);
    }

    @Test
    void testCreate() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Nuevo Usuario");

        when(usuarioRepo.save(usuario)).thenReturn(usuario);

        Usuario result = usuarioService.create(usuario);
        assertNotNull(result);
        assertEquals("Nuevo Usuario", result.getNombre());
        verify(usuarioRepo, times(1)).save(usuario);
    }

    @Test
    void testDelete() {
        doNothing().when(usuarioRepo).deleteById(1);

        usuarioService.delete(1);
        verify(usuarioRepo, times(1)).deleteById(1);
    }
}
