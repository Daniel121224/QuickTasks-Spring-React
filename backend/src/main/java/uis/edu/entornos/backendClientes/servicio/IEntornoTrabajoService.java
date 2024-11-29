/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package uis.edu.entornos.backendClientes.servicio;

import java.util.Optional;

import java.util.List;

import uis.edu.entornos.backendClientes.modelo.EntornoTrabajo;

/**
 *
 * @author roble
 */
public interface IEntornoTrabajoService {
    List<EntornoTrabajo> findAll();

    Optional<EntornoTrabajo> findById(Integer id);

    EntornoTrabajo create(EntornoTrabajo entornoTrabajo);

    EntornoTrabajo update(EntornoTrabajo entornoTrabajo);

    void delete(Integer id);
}
