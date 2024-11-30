/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.Proyecto;
import uis.edu.entornos.backendClientes.repositorio.IProyectoRepository;

/**
 *
 * @author roble
 */
@Service
public class ProyectoService implements IProyectoService{

    @Autowired
    private IProyectoRepository proyectoRepo;

    @Override
    public List<Proyecto> findAll() {
        return proyectoRepo.findAll();
    }

    @Override
    public Optional<Proyecto> findById(Integer id) {
        return proyectoRepo.findById(id);
    }

    @Override
    public Proyecto create(Proyecto proyecto) {
        return proyectoRepo.save(proyecto);
    }

    @Override
    public Proyecto update(Proyecto proyecto) {
        return proyectoRepo.save(proyecto);
    }

    @Override
    public void delete(Integer id) {
        proyectoRepo.deleteById(id);
    }
    
}
