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

import uis.edu.entornos.backendClientes.modelo.Tarea;
import uis.edu.entornos.backendClientes.repositorio.ITareaRepository;

class TareaServiceTest {

    @Mock
    private ITareaRepository tareaRepo;

    @InjectMocks
    private TareaService tareaService;

    public TareaServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        // Mock de datos
        Tarea tarea1 = new Tarea();
        tarea1.setIdTarea(1);
        tarea1.setNombreTarea("Tarea 1");

        Tarea tarea2 = new Tarea();
        tarea2.setIdTarea(2);
        tarea2.setNombreTarea("Tarea 2");

        when(tareaRepo.findAll()).thenReturn(Arrays.asList(tarea1, tarea2));

        // Llamar al método y verificar resultados
        List<Tarea> tareas = tareaService.findAll();
        assertEquals(2, tareas.size());
        assertEquals("Tarea 1", tareas.get(0).getNombreTarea());
        verify(tareaRepo, times(1)).findAll(); // Verificar interacción con el repositorio
    }

    @Test
    void testFindById() {
        // Mock de datos
        Tarea tarea = new Tarea();
        tarea.setIdTarea(1);
        tarea.setNombreTarea("Tarea 1");

        when(tareaRepo.findById(1)).thenReturn(Optional.of(tarea));

        // Llamar al método y verificar resultados
        Optional<Tarea> result = tareaService.findById(1);
        assertTrue(result.isPresent());
        assertEquals("Tarea 1", result.get().getNombreTarea());
        verify(tareaRepo, times(1)).findById(1);
    }

    @Test
    void testCreate() {
        // Mock de datos
        Tarea tarea = new Tarea();
        tarea.setNombreTarea("Nueva tarea");

        when(tareaRepo.save(tarea)).thenReturn(tarea);

        // Llamar al método y verificar resultados
        Tarea result = tareaService.create(tarea);
        assertNotNull(result);
        assertEquals("Nueva tarea", result.getNombreTarea());
        verify(tareaRepo, times(1)).save(tarea);
    }

    @Test
    void testDelete() {
        // Llamar al método y verificar interacción
        tareaService.delete(1);
        verify(tareaRepo, times(1)).deleteById(1);
    }
}
