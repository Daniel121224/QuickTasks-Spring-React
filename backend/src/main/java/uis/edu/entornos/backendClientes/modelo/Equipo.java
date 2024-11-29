package uis.edu.entornos.backendClientes.modelo;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;

@Entity
@Table(name = "equipo")
public class Equipo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEquipo;
    
    @Column(name = "nombre", nullable = false, length = 70)
    private String nombre;
    
    @Column(name = "integrantes", nullable = false, length = 70)
    private String integrantes;

    @Column(name = "metodologia", nullable = false, length = 70)
    private String metodologia;

    @Column(name = "codigo", nullable = false, length = 70)
    private String codigo;
    
    public Integer getIdEquipo(){
        return idEquipo;
    }
    
    public void setIdEquipo(Integer idEquipo){
        this.idEquipo = idEquipo;
    }
    
    public String getNombre(){
        return nombre;
    }
    
    public void setNombre(String nombre){
        this.nombre = nombre;
    }
    
    public String getIntegrantes(){
        return integrantes;
    }
    
    public void setIntegrantes(String integrantes){
        this.integrantes = integrantes;
    }

    public String getMetodologia(){
        return metodologia;
    }

    public void setMetodologia(String metodologia){
        this.metodologia = metodologia;
    }

    public String getCodigo(){
        return codigo;
    }

    public void setCodigo(String codigo){
        this.codigo = codigo;
    }
}
