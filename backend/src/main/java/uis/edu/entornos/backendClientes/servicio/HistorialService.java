package uis.edu.entornos.backendClientes.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import uis.edu.entornos.backendClientes.modelo.Historial;
import uis.edu.entornos.backendClientes.repositorio.IHistorialRepository;

@Service
public class HistorialService implements IHistorialService {

    @Autowired
    private IHistorialRepository historialRepo;

    @Override
    public List<Historial> findAll() {
        return historialRepo.findAll();
    }

    @Override
    public Historial save(Historial historial) {
        return historialRepo.save(historial);
    }
}
