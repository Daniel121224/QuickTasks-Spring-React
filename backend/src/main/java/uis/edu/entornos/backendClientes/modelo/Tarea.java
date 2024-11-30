package uis.edu.entornos.backendClientes.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTarea;

    @Column(name = "nombre_tarea", nullable = false, length = 100)
    private String nombreTarea;

    @Column(name = "descripcion_tarea", nullable = false, length = 255)
    private String descripcionTarea;

    @Column(name = "fechaEntrega_tarea", nullable = false, length = 50)
    private String fechaEntregaTarea;

    @Column(name = "completada", nullable = false)
    private boolean completada;

    //Me dio problemas al tener dos llaves foraneas la clase tarea
    //@ManyToOne
    //@JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    //@JsonBackReference
    //private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idProyecto", referencedColumnName = "idProyecto")
    @JsonBackReference
    private Proyecto proyecto;

    // Getters y Setters
    public Integer getIdTarea() {
        return idTarea;
    }

    public void setIdTarea(Integer idTarea) {
        this.idTarea = idTarea;
    }

    public String getNombreTarea() {
        return nombreTarea;
    }

    public void setNombreTarea(String nombreTarea) {
        this.nombreTarea = nombreTarea;
    }

    public String getDescripcionTarea() {
        return descripcionTarea;
    }

    public void setDescripcionTarea(String descripcionTarea) {
        this.descripcionTarea = descripcionTarea;
    }

    public String getFechaEntregaTarea() {
        return fechaEntregaTarea;
    }

    public void setFechaEntregaTarea(String fechaEntregaTarea) {
        this.fechaEntregaTarea = fechaEntregaTarea;
    }

    public boolean isCompletada() {
        return completada;
    }

    public void setCompletada(boolean completada) {
        this.completada = completada;
    }

    //public Usuario getUsuario() {
    //    return usuario;
    //}

    //public void setUsuario(Usuario usuario) {
    //    this.usuario = usuario;
    //}

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
}
