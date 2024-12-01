package uis.edu.entornos.backendClientes.modelo;

import javax.persistence.*;
import java.util.Date;

/*
Modelo y definición de los atributos y columnas para la clase Historial
*/
//h
@Entity
@Table(name = "historial")
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHistorial;

    @Column(name = "nombre_tarea", nullable = false, length = 100)
    private String nombreTarea;

    @Column(name = "descripcion_tarea", nullable = false, length = 255)
    private String descripcionTarea;

    @Column(name = "fecha_entrega_tarea", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaEntregaTarea;

    @Column(name = "fecha_completada", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCompletada;

    // Getters y setters
    public Integer getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(Integer idHistorial) {
        this.idHistorial = idHistorial;
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

    public Date getFechaEntregaTarea() {
        return fechaEntregaTarea;
    }

    public void setFechaEntregaTarea(Date fechaEntregaTarea) {
        this.fechaEntregaTarea = fechaEntregaTarea;
    }

    public Date getFechaCompletada() {
        return fechaCompletada;
    }

    public void setFechaCompletada(Date fechaCompletada) {
        this.fechaCompletada = fechaCompletada;
    }
}
