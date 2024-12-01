package uis.edu.entornos.backendClientes.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uis.edu.entornos.backendClientes.modelo.Recordatorio;
import uis.edu.entornos.backendClientes.repositorio.IRecordatorioRepository;

@Service
public class RecordatorioService implements IRecordatorioService {

    @Autowired
    private IRecordatorioRepository recordatorioRepositorio;

    @Override
    public List<Recordatorio> findAll() {
        return recordatorioRepositorio.findAll();
    }

    @Override
    public Optional<Recordatorio> findById(Integer idRecordatorio) {
        return recordatorioRepositorio.findById(idRecordatorio);
    }

    @Override
    public Recordatorio create(Recordatorio recordatorio) {
        return recordatorioRepositorio.save(recordatorio);
    }

    @Override
    public Recordatorio update(Recordatorio recordatorio) {
        return recordatorioRepositorio.save(recordatorio);
    }

    @Override
    public void delete(Integer idRecordatorio) {
        recordatorioRepositorio.deleteById(idRecordatorio);
    }
}
