package uis.edu.entornos.backendClientes.servicio;

import java.util.List;
import java.util.Optional;

import uis.edu.entornos.backendClientes.modelo.Recordatorio;

public interface IRecordatorioService {

    List<Recordatorio> findAll();

    Optional<Recordatorio> findById(Integer idRecordatorio);

    Recordatorio create(Recordatorio recordatorio);

    Recordatorio update(Recordatorio recordatorio);

    void delete(Integer idRecordatorio);
}
