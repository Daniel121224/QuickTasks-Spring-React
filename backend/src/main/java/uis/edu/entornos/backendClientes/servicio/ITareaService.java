/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;

import java.util.Optional;

import java.util.List;

import uis.edu.entornos.backendClientes.modelo.Tarea;
/**
 *
 * @author roble
 */
public interface ITareaService {
    List<Tarea> findAll();

    Optional<Tarea> findById(Integer id);

    Tarea create(Tarea tarea);

    Tarea update(Tarea tarea);

    void delete(Integer id);
}
