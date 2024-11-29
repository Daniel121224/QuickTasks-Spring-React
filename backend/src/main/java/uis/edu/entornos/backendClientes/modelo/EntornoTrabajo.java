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
@Table(name = "entorno_trabajo")
public class EntornoTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEntorno;

    @Column(name = "nombre_entorno", nullable = false, length = 100)
    private String nombreEntorno;

    @Column(name = "cant_participantes", nullable = false)
    private int cantParticipantes;

    @ManyToOne
    @JoinColumn(name = "idEquipo", referencedColumnName = "idEquipo")
    private Equipo equipo;

    public Integer getIdEntorno() {
        return idEntorno;
    }

    public void setIdEntorno(Integer idEntorno) {
        this.idEntorno = idEntorno;
    }

    public String getNombreEntorno() {
        return nombreEntorno;
    }

    public void setNombreEntorno(String nombreEntorno) {
        this.nombreEntorno = nombreEntorno;
    }

    public int getCantParticipantes() {
        return cantParticipantes;
    }

    public void setCantParticipantes(int cantParticipantes) {
        this.cantParticipantes = cantParticipantes;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }
}