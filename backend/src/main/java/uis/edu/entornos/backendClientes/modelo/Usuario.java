package uis.edu.entornos.backendClientes.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.Entity;
import javax.persistence.Table;

import java.util.List;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;

@Entity
@Table(name = "usuario")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;
    
    @Column(name = "nombre", nullable = false, length = 70)
    private String nombre;
    
    @Column(name = "correo", nullable = false, length = 70)
    private String correo;
    
    //Se eliminó el atributo apellido
    
    @Column(name = "documento", nullable = false, length = 70)
    private String documento;
    
    @Column(name = "contraseña", nullable = false, length = 70)
    private String contraseña;
    
    @OneToMany(mappedBy = "usuario")
    private List<Proyecto> proyectos;

    //@OneToMany(mappedBy = "usuario")
    //private List<Tarea> tareas;
    
    @JsonManagedReference //Para evitar el bucle de serialización con llaves foráneas
    public List<Proyecto> getProyectos(){
        return proyectos;
    }
    
    //@JsonManagedReference //Para evitar el bucle de serialización con llaves foráneas
    //public List<Tarea> getTareas(){
    //    return tareas;
    //}

    public void setProyectos(List<Proyecto> proyectos){
        this.proyectos = proyectos;
    }

    //public void setTareas(List<Tarea> tareas){
    //    this.tareas = tareas;
    //}


    public Integer getIdUsuario(){
        return idUsuario;
    }
    
    public void setIdUsuario(Integer idUsuario){
        this.idUsuario = idUsuario;
    }
    
    public String getNombre(){
        return nombre;
    }
    
    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    //Se eliminó el get y set de apellido
    
    public String getDocumento(){
        return documento;
    }

    public void setDocumento(String documento){
        this.documento = documento;
    }
    
    public String getCorreo(){
        return correo;
    }
    
    public void setCorreo(String correo){
        this.correo = correo;
    }
    
    public String getContraseña(){
        return contraseña;
    }
    
    public void setContraseña(String contraseña){
        this.contraseña = contraseña;
    }
}
