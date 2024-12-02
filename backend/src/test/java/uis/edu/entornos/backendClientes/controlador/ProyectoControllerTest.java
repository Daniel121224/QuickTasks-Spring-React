package uis.edu.entornos.backendClientes.controlador;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.boot.test.mock.mockito.MockBean;
import uis.edu.entornos.backendClientes.modelo.Proyecto;
import uis.edu.entornos.backendClientes.servicio.ProyectoService;

@SpringBootTest
public class ProyectoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProyectoService proyectoService;

    private Proyecto proyecto;

    @BeforeEach
    void setUp() {
        proyecto = new Proyecto();
        proyecto.setIdProyecto(1);
        proyecto.setNombreProyecto("Test Proyecto");
        proyecto.setProgreso(50);

        mockMvc = MockMvcBuilders.standaloneSetup(new ProyectoController()).build();
    }

    @Test
    void testCreateProyecto() throws Exception {
        when(proyectoService.create(any(Proyecto.class))).thenReturn(proyecto);

        mockMvc.perform(post("/api/proyecto/create")
                .contentType("application/json")
                .content("{\"nombreProyecto\":\"Test Proyecto\", \"progreso\": 50}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nombreProyecto").value("Test Proyecto"))
                .andExpect(jsonPath("$.progreso").value(50));
    }

    @Test
    void testFindById() throws Exception {
        when(proyectoService.findById(1)).thenReturn(java.util.Optional.of(proyecto));

        mockMvc.perform(get("/api/proyecto/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombreProyecto").value("Test Proyecto"))
                .andExpect(jsonPath("$.progreso").value(50));
    }

    @Test
    void testUpdateProyecto() throws Exception {
        when(proyectoService.findById(1)).thenReturn(java.util.Optional.of(proyecto));
        when(proyectoService.update(any(Proyecto.class))).thenReturn(proyecto);

        mockMvc.perform(put("/api/proyecto/update")
                .contentType("application/json")
                .content("{\"idProyecto\":1, \"nombreProyecto\":\"Test Proyecto\", \"progreso\": 75}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Proyecto actualizado correctamente"));
    }

    @Test
    void testDeleteProyecto() throws Exception {
        doNothing().when(proyectoService).delete(1);

        mockMvc.perform(delete("/api/proyecto/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Proyecto eliminado con éxito"));
    }
}
