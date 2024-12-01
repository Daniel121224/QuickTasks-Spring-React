package uis.edu.entornos.backendClientes.servicio;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import uis.edu.entornos.backendClientes.modelo.Usuario;
import uis.edu.entornos.backendClientes.modelo.Proyecto;
import uis.edu.entornos.backendClientes.modelo.Tarea;
import uis.edu.entornos.backendClientes.servicio.TareaService;
import uis.edu.entornos.backendClientes.servicio.UsuarioService;
import uis.edu.entornos.backendClientes.servicio.ProyectoService;

import java.util.Date;
import java.util.Arrays;

/*
Este data loader permite que se carguen registros en la clase tarea al iniciar la aplicación
de este modo se proporciona un breve ejemplo de datos cargados en la aplicación
*/

@Component
public class DataLoader implements CommandLineRunner {

    private final TareaService tareaService;
    private final UsuarioService usuarioService;
    private final ProyectoService proyectoService;

    public DataLoader(TareaService tareaService, UsuarioService usuarioService, ProyectoService proyectoService) {
        this.tareaService = tareaService;
        this.usuarioService = usuarioService;
        this.proyectoService = proyectoService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si no hay usuarios registrados antes de cargar uno
        if (usuarioService.findAll().isEmpty()) {
            // Crear un usuario
            Usuario usuario = new Usuario();
            usuario.setNombre("Juan Pérez");
            usuario.setCorreo("juan.perez@correo.com");
            usuario.setDocumento("1234567890");
            usuario.setContrasena("password123");
            usuarioService.create(usuario);

            // Crear proyectos
            Proyecto proyecto1 = new Proyecto();
            proyecto1.setNombreProyecto("Proyecto de Desarrollo");
            proyecto1.setProgreso(50);  // Progreso inicial
            proyecto1.setUsuario(usuario);

            Proyecto proyecto2 = new Proyecto();
            proyecto2.setNombreProyecto("Proyecto de Investigación");
            proyecto2.setProgreso(10);  // Progreso inicial
            proyecto2.setUsuario(usuario);

            // Guardar los proyectos en la base de datos
            proyectoService.create(proyecto1);
            proyectoService.create(proyecto2);

            // Crear tareas para el primer proyecto
            Tarea tarea1 = new Tarea();
            tarea1.setNombreTarea("Estudiar Matemáticas");
            tarea1.setDescripcionTarea("Estudiar para el examen de cálculo");
            tarea1.setFechaEntregaTarea(new Date());
            tarea1.setCompletada(false);
            tarea1.setProyecto(proyecto1);

            Tarea tarea2 = new Tarea();
            tarea2.setNombreTarea("Proyecto de Historia");
            tarea2.setDescripcionTarea("Terminar el proyecto de historia");
            tarea2.setFechaEntregaTarea(new Date());
            tarea2.setCompletada(false);
            tarea2.setProyecto(proyecto1);

            Tarea tarea3 = new Tarea();
            tarea3.setNombreTarea("Tarea de Programación");
            tarea3.setDescripcionTarea("Realizar la tarea de programación en Java");
            tarea3.setFechaEntregaTarea(new Date());
            tarea3.setCompletada(false);
            tarea3.setProyecto(proyecto1);

            // Guardar las tareas en la base de datos
            tareaService.create(tarea1);
            tareaService.create(tarea2);
            tareaService.create(tarea3);
        }
    }
}
