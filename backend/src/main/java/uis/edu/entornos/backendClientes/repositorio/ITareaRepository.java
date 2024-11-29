/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package uis.edu.entornos.backendClientes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import uis.edu.entornos.backendClientes.modelo.Tarea;

/**
 *
 * @author roble
 */
public interface ITareaRepository extends JpaRepository<Tarea, Integer>{
    
}
