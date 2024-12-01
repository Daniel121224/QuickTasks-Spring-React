package uis.edu.entornos.backendClientes.servicio;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import uis.edu.entornos.backendClientes.servicio.TareaService;
import uis.edu.entornos.backendClientes.modelo.Tarea;
import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {

    private final TareaService tareaService;

    // Constructor que inyecta el servicio TareaService
    public DataLoader(TareaService tareaService) {
        this.tareaService = tareaService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verifica si hay tareas en la base de datos antes de agregar algunas de prueba
        if (tareaService.findAll().isEmpty()) {
            // Crear tareas de prueba
            Tarea tarea1 = new Tarea();
            tarea1.setNombreTarea("Estudiar Matemáticas");
            tarea1.setDescripcionTarea("Estudiar para el examen de cálculo");
            tarea1.setFechaEntregaTarea(new Date());
            tarea1.setCompletada(false);

            Tarea tarea2 = new Tarea();
            tarea2.setNombreTarea("Proyecto de Historia");
            tarea2.setDescripcionTarea("Terminar el proyecto de historia");
            tarea2.setFechaEntregaTarea(new Date());
            tarea2.setCompletada(false);

            Tarea tarea3 = new Tarea();
            tarea3.setNombreTarea("Tarea de Programación");
            tarea3.setDescripcionTarea("Realizar la tarea de programación en Java");
            tarea3.setFechaEntregaTarea(new Date());
            tarea3.setCompletada(false);

            // Guardar las tareas en la base de datos
            tareaService.create(tarea1);
            tareaService.create(tarea2);
            tareaService.create(tarea3);
        }
    }
}
