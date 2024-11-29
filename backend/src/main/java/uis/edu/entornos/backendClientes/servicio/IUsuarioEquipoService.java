/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;

import java.util.Optional;

import java.util.List;

import uis.edu.entornos.backendClientes.modelo.UsuarioEquipo;
/**
 *
 * @author roble
 */
public interface IUsuarioEquipoService {
    List<UsuarioEquipo> findAll();

    Optional<UsuarioEquipo> findById(Integer id);

    UsuarioEquipo create(UsuarioEquipo usuarioEquipo);

    UsuarioEquipo update(UsuarioEquipo usuarioEquipo);

    void delete(Integer id);
}
