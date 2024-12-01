package uis.edu.entornos.backendClientes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uis.edu.entornos.backendClientes.modelo.Historial;

@Repository
public interface IHistorialRepository extends JpaRepository<Historial, Integer> {
    
}
