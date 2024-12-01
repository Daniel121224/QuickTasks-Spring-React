package uis.edu.entornos.backendClientes.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "recordatorio")
public class Recordatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRecordatorio;

    @Column(name = "mensaje", nullable = false, length = 255)
    private String mensaje;

    @Column(name = "fecha_recordatorio", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRecordatorio;

    @Column(name = "enviado", nullable = false)
    private boolean enviado;

    @OneToOne
    @JoinColumn(name = "idTarea", nullable = false, unique = true)
    @JsonBackReference
    private Tarea tarea;

    // Getters y Setters
    public Integer getIdRecordatorio() {
        return idRecordatorio;
    }

    public void setIdRecordatorio(Integer idRecordatorio) {
        this.idRecordatorio = idRecordatorio;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Date getFechaRecordatorio() {
        return fechaRecordatorio;
    }

    public void setFechaRecordatorio(Date fechaRecordatorio) {
        this.fechaRecordatorio = fechaRecordatorio;
    }

    public boolean isEnviado() {
        return enviado;
    }

    public void setEnviado(boolean enviado) {
        this.enviado = enviado;
    }

    public Tarea getTarea() {
        return tarea;
    }

    public void setTarea(Tarea tarea) {
        this.tarea = tarea;
    }
}

