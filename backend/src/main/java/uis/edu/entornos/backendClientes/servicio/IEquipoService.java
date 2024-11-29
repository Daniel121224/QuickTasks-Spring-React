/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;

import java.util.Optional;

import java.util.List;

import uis.edu.entornos.backendClientes.modelo.Equipo;

/**
 *
 * @author roble
 */
public interface IEquipoService {
    List<Equipo> findAll();

    Optional<Equipo> findById(Integer id);

    Equipo create(Equipo equipo);

    Equipo update(Equipo equipo);

    void delete(Integer id);
}
