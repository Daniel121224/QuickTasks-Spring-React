package uis.edu.entornos.backendClientes.modelo;

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

    @Column(name = "nombreTarea", nullable = false, length = 100)
    private String nombreTarea;

    @Column(name = "descripcionTarea", nullable = false, length = 255)
    private String descripcionTarea;

    @Column(name = "clasificacionTarea", nullable = false, length = 50)
    private String clasificacionTarea;

    @ManyToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idEntorno", referencedColumnName = "idEntorno")
    private EntornoTrabajo entornoTrabajo;

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

    public String getClasificacionTarea() {
        return clasificacionTarea;
    }

    public void setClasificacionTarea(String clasificacionTarea) {
        this.clasificacionTarea = clasificacionTarea;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public EntornoTrabajo getEntornoTrabajo() {
        return entornoTrabajo;
    }

    public void setEntornoTrabajo(EntornoTrabajo entornoTrabajo) {
        this.entornoTrabajo = entornoTrabajo;
    }
}
