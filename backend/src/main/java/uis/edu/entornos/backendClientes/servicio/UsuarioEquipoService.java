/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.UsuarioEquipo;
import uis.edu.entornos.backendClientes.repositorio.IUsuarioEquipoRepository;
/**
 *
 * @author roble
 */
@Service
public class UsuarioEquipoService implements IUsuarioEquipoService{

    @Autowired
    private IUsuarioEquipoRepository usuarioEquipoRepo;

    @Override
    public List<UsuarioEquipo> findAll() {
        return usuarioEquipoRepo.findAll();
    }

    @Override
    public Optional<UsuarioEquipo> findById(Integer id) {
        return usuarioEquipoRepo.findById(id);
    }

    @Override
    public UsuarioEquipo create(UsuarioEquipo usuarioEquipo) {
        return usuarioEquipoRepo.save(usuarioEquipo);
    }

    @Override
    public UsuarioEquipo update(UsuarioEquipo usuarioEquipo) {
        return usuarioEquipoRepo.save(usuarioEquipo);
    }

    @Override
    public void delete(Integer id) {
        usuarioEquipoRepo.deleteById(id);
    }
    
}
