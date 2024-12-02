package uis.edu.entornos.backendClientes.controlador;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import uis.edu.entornos.backendClientes.modelo.Usuario;
import uis.edu.entornos.backendClientes.servicio.UsuarioService;

@WebMvcTest(UsuarioController.class)
class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService usuarioService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testFindAll() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombre("Usuario 1");

        when(usuarioService.findAll()).thenReturn(Arrays.asList(usuario));

        mockMvc.perform(get("/api/usuario/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Usuario 1"));

        verify(usuarioService, times(1)).findAll();
    }

    @Test
    void testFindById() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1);
        usuario.setNombre("Usuario 1");

        when(usuarioService.findById(1)).thenReturn(Optional.of(usuario));

        mockMvc.perform(get("/api/usuario/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Usuario 1"));

        verify(usuarioService, times(1)).findById(1);
    }

    @Test
    void testCreate() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setNombre("Nuevo Usuario");

        when(usuarioService.create(any(Usuario.class))).thenReturn(usuario);

        mockMvc.perform(post("/api/usuario/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuario)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nombre").value("Nuevo Usuario"));

        verify(usuarioService, times(1)).create(any(Usuario.class));
    }

    @Test
    void testDelete() throws Exception {
        doNothing().when(usuarioService).delete(1);

        mockMvc.perform(delete("/api/usuario/1"))
                .andExpect(status().isOk());

        verify(usuarioService, times(1)).delete(1);
    }
}
