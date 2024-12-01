package uis.edu.entornos.backendClientes.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;

/*
Modelo y definición de los atributos y columnas para la clase proyecto
*/

@Entity
@Table(name = "proyecto")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProyecto;

    @Column(name = "nombreproyecto", nullable = false, length = 70)
    private String nombreProyecto;
    
    @Column(name = "progreso", nullable = false, length = 70)
    private Integer progreso;

    @OneToMany(mappedBy = "proyecto")
    private List<Tarea> tareas;

    @JsonManagedReference
    public List<Tarea> getTareas(){
        return tareas;
    }

    @ManyToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    @JsonBackReference //Para evitar el bucle de serialización con llaves foráneas
    private Usuario usuario;


    //

    public Integer getIdProyecto() {
        return idProyecto;
    }

    public void setIdProyecto(Integer idProyecto) {
        this.idProyecto = idProyecto;
    }

    public String getNombreProyecto() {
        return nombreProyecto;
    }

    public void setNombreProyecto(String nombreProyecto) {
        this.nombreProyecto = nombreProyecto;
    }

    public void setProgreso(Integer progreso) {
        this.progreso = progreso;
    }

    public Integer getProgreso() {
        return progreso;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    
}