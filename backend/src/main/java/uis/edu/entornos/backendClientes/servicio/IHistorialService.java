package uis.edu.entornos.backendClientes.servicio;

import java.util.List;

import uis.edu.entornos.backendClientes.modelo.Historial;

public interface IHistorialService {
    List<Historial> findAll();

    Historial save(Historial historial);
}
