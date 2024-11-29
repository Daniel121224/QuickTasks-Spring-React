/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.Equipo;
import uis.edu.entornos.backendClientes.repositorio.IEquipoRepository;

/**
 *
 * @author roble
 */
@Service
public class EquipoService implements IEquipoService{

    @Autowired
    private IEquipoRepository equipoRepo;

    @Override
    public List<Equipo> findAll() {
        return equipoRepo.findAll();
    }

    @Override
    public Optional<Equipo> findById(Integer id) {
        return equipoRepo.findById(id);
    }

    @Override
    public Equipo create(Equipo equipo) {
        return equipoRepo.save(equipo);
    }

    @Override
    public Equipo update(Equipo equipo) {
        return equipoRepo.save(equipo);
    }

    @Override
    public void delete(Integer id) {
        equipoRepo.deleteById(id);
    }
    
}
