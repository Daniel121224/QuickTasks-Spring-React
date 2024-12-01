package uis.edu.entornos.backendClientes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uis.edu.entornos.backendClientes.modelo.Usuario;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer>{
    @Query("select count(*) from Usuario as u where u.nombre = :nombreUsuario and u.contrasena = :contrasena")
    Integer findByNombreUsuarioAndPassword(@Param("nombreUsuario") String nombreUsuario, 
                    @Param("contrasena") String contrasena);
    

    @Query("select u from Usuario as u where u.nombre = :nombreUsuario and u.contrasena = :contrasena")
    Usuario findByNameAndPassword(@Param("nombreUsuario") String nombreUsuario, 
                    @Param("contrasena") String contrasena);
}
