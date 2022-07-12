package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.Resumen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IResumenRepository extends JpaRepository <Resumen,Integer>{
    
}