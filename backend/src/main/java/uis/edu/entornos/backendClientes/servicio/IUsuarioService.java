package uis.edu.entornos.backendClientes.servicio;

import java.util.Optional;

import java.util.List;

import uis.edu.entornos.backendClientes.modelo.Usuario;

public interface IUsuarioService {

    List<Usuario> findAll();

    Optional<Usuario> findById(Integer id);

    Usuario create(Usuario usuario);

    Usuario update(Usuario usuario);

    void delete(Integer id);
}
