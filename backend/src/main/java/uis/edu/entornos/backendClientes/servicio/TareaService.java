/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.Tarea;
import uis.edu.entornos.backendClientes.repositorio.ITareaRepository;

/**
 *
 * @author roble
 */

@Service
public class TareaService implements ITareaService{

    @Autowired
    private ITareaRepository tareaRepo;

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
        return tareaRepo.save(tarea);
    }

    @Override
    public Tarea update(Tarea tarea) {
        return tareaRepo.save(tarea);
    }

    @Override
    public void delete(Integer id) {
        tareaRepo.deleteById(id);
    }
    
}
