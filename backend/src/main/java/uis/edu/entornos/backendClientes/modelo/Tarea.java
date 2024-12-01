package uis.edu.entornos.backendClientes.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/*
Modelo y definición de los atributos y columnas para la clase Tarea
*/

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
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaEntregaTarea;

    @Column(name = "completada", nullable = false)
    private boolean completada;

    
    
    //Relación con usuario
    /* Error 415
    @ManyToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario", nullable = false)
    private Usuario usuario;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    */
    
    
    
    //Relación con proyecto
    @ManyToOne
    @JoinColumn(name = "idProyecto", referencedColumnName = "idProyecto", nullable = true)
    @JsonBackReference
    private Proyecto proyecto;
    
    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    
    //Relación con recordatorio
    @OneToOne(mappedBy = "tarea", cascade = CascadeType.ALL, orphanRemoval = true)
    private Recordatorio recordatorio;

    public Recordatorio getRecordatorio() {
        return recordatorio;
    }

    public void setRecordatorio(Recordatorio recordatorio) {
        this.recordatorio = recordatorio;
    }

    
    
    
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

    public Date getFechaEntregaTarea() {
        return fechaEntregaTarea;
    }

    public void setFechaEntregaTarea(Date fechaEntregaTarea) {
        this.fechaEntregaTarea = fechaEntregaTarea;
    }

    public boolean isCompletada() {
        return completada;
    }

    public void setCompletada(boolean completada) {
        this.completada = completada;
    }

}
