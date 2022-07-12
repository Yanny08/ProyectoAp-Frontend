package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IContactoRepository extends JpaRepository <Contacto,Integer>{
    
}