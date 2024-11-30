package uis.edu.entornos.backendClientes.modelo;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
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
