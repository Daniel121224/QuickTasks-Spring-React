package uis.edu.entornos.backendClientes.controlador;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import uis.edu.entornos.backendClientes.modelo.Tarea;
import uis.edu.entornos.backendClientes.servicio.TareaService;

@WebMvcTest(TareaController.class)
class TareaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TareaService tareaService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testFindAll() throws Exception {
        // Mock de datos
        Tarea tarea = new Tarea();
        tarea.setIdTarea(1);
        tarea.setNombreTarea("Tarea 1");

        when(tareaService.findAll()).thenReturn(Arrays.asList(tarea));

        // Simular una solicitud GET
        mockMvc.perform(get("/api/tarea/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombreTarea").value("Tarea 1"));

        verify(tareaService, times(1)).findAll();
    }

    @Test
    void testCreate() throws Exception {
        // Mock de datos
        Tarea tarea = new Tarea();
        tarea.setNombreTarea("Nueva tarea");

        when(tareaService.create(any(Tarea.class))).thenReturn(tarea);

        // Simular una solicitud POST
        mockMvc.perform(post("/api/tarea/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(tarea)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nombreTarea").value("Nueva tarea"));

        verify(tareaService, times(1)).create(any(Tarea.class));
    }
}
