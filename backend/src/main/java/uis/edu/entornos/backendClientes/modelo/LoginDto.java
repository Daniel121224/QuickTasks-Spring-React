package uis.edu.entornos.backendClientes.modelo;

/*
Configuracion del Login de la aplicación, mediante una consulta a usuarios registrados
y sus respectivas contraeñas
*/

public class LoginDto {

    private String nombreUsuario;

    private String contraseña;

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
    
}
