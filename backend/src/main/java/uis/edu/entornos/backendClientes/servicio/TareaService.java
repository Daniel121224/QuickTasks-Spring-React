package uis.edu.entornos.backendClientes.servicio;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.Proyecto;
import uis.edu.entornos.backendClientes.modelo.Tarea;
import uis.edu.entornos.backendClientes.repositorio.IProyectoRepository;
import uis.edu.entornos.backendClientes.repositorio.ITareaRepository;

/**
 *
 * @author roble
 */

@Service
public class TareaService implements ITareaService {

    @Autowired
    private ITareaRepository tareaRepo;

    @Autowired
    private IProyectoRepository proyectoRepo;

    @Override
    public List<Tarea> findAll() {
        return tareaRepo.findAll();
    }

    @Override
    public Optional<Tarea> findById(Integer id) {
        return tareaRepo.findById(id);
    }

    @Override
    public Tarea create(Tarea tarea) {
        // Persistir el proyecto antes de asociarlo
        if (tarea.getProyecto() != null) {
            Proyecto proyecto = tarea.getProyecto();
            if (proyecto.getIdProyecto() == null || !proyectoRepo.existsById(proyecto.getIdProyecto())) {
                proyecto = proyectoRepo.save(proyecto);
                tarea.setProyecto(proyecto); // Asociar el proyecto persistido a la tarea
            }
        }
        return tareaRepo.save(tarea);
    }

    @Override
    public Tarea update(Tarea tarea) {
        // Persistir el proyecto antes de actualizar la tarea
        if (tarea.getProyecto() != null) {
            Proyecto proyecto = tarea.getProyecto();
            if (proyecto.getIdProyecto() == null || !proyectoRepo.existsById(proyecto.getIdProyecto())) {
                proyecto = proyectoRepo.save(proyecto);
                tarea.setProyecto(proyecto); // Asociar el proyecto persistido a la tarea
            }
        }
        return tareaRepo.save(tarea);
    }

    @Override
    public void delete(Integer id) {
        tareaRepo.deleteById(id);
    }
}
