package uis.edu.entornos.backendClientes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
Método main que inicia el backend del proyecto spring boot
Al ejecutarse, se crean lass tablas y columnas definidas en los modelos
de cada clase en la base de datos relacional.
Esto por la propiedad de hibernate = update definida en application.properties
*/

@SpringBootApplication
public class BackendClientesApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendClientesApplication.class, args);
	}

}
