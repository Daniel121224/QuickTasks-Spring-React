package uis.edu.entornos.backendClientes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import uis.edu.entornos.backendClientes.modelo.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Integer>{
    @Query("select count(*) from Usuario as u where u.nombre = :nombreUsuario and u.contraseña = :contraseña")
    Integer findByNombreUsuarioAndPassword(@Param("nombreUsuario") String nombreUsuario, 
                    @Param("contraseña") String contraseña);
    

    @Query("select u from Usuario as u where u.nombre = :nombreUsuario and u.contraseña = :contraseña")
    Usuario findByNameAndPassword(@Param("nombreUsuario") String nombreUsuario, 
                    @Param("contraseña") String contraseña);
}
