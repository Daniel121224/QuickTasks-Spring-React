/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.EntornoTrabajo;
import uis.edu.entornos.backendClientes.repositorio.IEntornoTrabajoRepository;

/**
 *
 * @author roble
 */
@Service
public class EntornoTrabajoService implements IEntornoTrabajoService{

    @Autowired
    private IEntornoTrabajoRepository entornoTrabajoRepo;

    @Override
    public List<EntornoTrabajo> findAll() {
        return entornoTrabajoRepo.findAll();
    }

    @Override
    public Optional<EntornoTrabajo> findById(Integer id) {
        return entornoTrabajoRepo.findById(id);
    }

    @Override
    public EntornoTrabajo create(EntornoTrabajo entornoTrabajo) {
        return entornoTrabajoRepo.save(entornoTrabajo);
    }

    @Override
    public EntornoTrabajo update(EntornoTrabajo entornoTrabajo) {
        return entornoTrabajoRepo.save(entornoTrabajo);
    }

    @Override
    public void delete(Integer id) {
        entornoTrabajoRepo.deleteById(id);
    }
    
}
