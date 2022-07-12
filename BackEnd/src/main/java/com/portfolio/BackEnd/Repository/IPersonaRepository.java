package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPersonaRepository extends JpaRepository <Persona,Integer>{
    
}
