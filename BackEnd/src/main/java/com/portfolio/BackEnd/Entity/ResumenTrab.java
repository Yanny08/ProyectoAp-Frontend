package com.portfolio.BackEnd.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class ResumenTrab {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    
    private String puesto;
    
    private String organismo;
    
    private String fechaIni;
     
    private String fechaFin;
    
    private String descripcion;
    
}
