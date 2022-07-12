package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends JpaRepository <Usuario,Integer>{
    
}
