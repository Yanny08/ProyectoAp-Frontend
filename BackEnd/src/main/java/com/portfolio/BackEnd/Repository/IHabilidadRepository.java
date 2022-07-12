package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.Habilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IHabilidadRepository extends JpaRepository <Habilidad,Integer>{
    
}