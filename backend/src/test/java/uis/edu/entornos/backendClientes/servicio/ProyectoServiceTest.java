package uis.edu.entornos.backendClientes.servicio;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import uis.edu.entornos.backendClientes.modelo.Proyecto;
import uis.edu.entornos.backendClientes.repositorio.IProyectoRepository;

import java.util.Optional;

@SpringBootTest
public class ProyectoServiceTest {

    @Mock
    private IProyectoRepository proyectoRepository;

    @InjectMocks
    private ProyectoService proyectoService;

    private Proyecto proyecto;

    @BeforeEach
    void setUp() {
        proyecto = new Proyecto();
        proyecto.setIdProyecto(1);
        proyecto.setNombreProyecto("Test Proyecto");
        proyecto.setProgreso(50);
    }

    @Test
    void testCreateProyecto() {
        when(proyectoRepository.save(any(Proyecto.class))).thenReturn(proyecto);

        Proyecto createdProyecto = proyectoService.create(proyecto);

        assertNotNull(createdProyecto);
        assertEquals("Test Proyecto", createdProyecto.getNombreProyecto());
        assertEquals(50, createdProyecto.getProgreso());
    }

    @Test
    void testFindById() {
        when(proyectoRepository.findById(1)).thenReturn(Optional.of(proyecto));

        Proyecto foundProyecto = proyectoService.findById(1).orElse(null);

        assertNotNull(foundProyecto);
        assertEquals("Test Proyecto", foundProyecto.getNombreProyecto());
    }

    @Test
    void testUpdateProyecto() {
        when(proyectoRepository.findById(1)).thenReturn(Optional.of(proyecto));
        when(proyectoRepository.save(any(Proyecto.class))).thenReturn(proyecto);

        proyecto.setProgreso(75);
        Proyecto updatedProyecto = proyectoService.update(proyecto);

        assertNotNull(updatedProyecto);
        assertEquals(75, updatedProyecto.getProgreso());
    }

    @Test
    void testDeleteProyecto() {
        doNothing().when(proyectoRepository).deleteById(1);

        proyectoService.delete(1);

        verify(proyectoRepository, times(1)).deleteById(1);
    }
}
