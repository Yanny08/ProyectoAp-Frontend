package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProyectoRepository extends JpaRepository <Proyecto,Integer>{
    
}