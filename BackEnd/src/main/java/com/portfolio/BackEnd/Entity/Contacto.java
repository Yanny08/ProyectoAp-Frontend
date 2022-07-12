package com.portfolio.BackEnd.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Contacto {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @NotNull
    @Size(min = 1, max = 50, message = "no cumple con la longitud")
    private String nombres;
    
    @NotNull
    @Size(min = 1, max = 50, message = "no cumple con la longitud")
    private String email;
    
    @NotNull
    @Size(min = 1, max = 200, message = "no cumple con la longitud")
    private String mensaje; 
}
