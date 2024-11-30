/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;

import java.util.Optional;

import java.util.List;

import uis.edu.entornos.backendClientes.modelo.Proyecto;

/**
 *
 * @author roble
 */
public interface IProyectoService {
    List<Proyecto> findAll();

    Optional<Proyecto> findById(Integer id);

    Proyecto create(Proyecto proyecto);

    Proyecto update(Proyecto proyecto);

    void delete(Integer id);
}
