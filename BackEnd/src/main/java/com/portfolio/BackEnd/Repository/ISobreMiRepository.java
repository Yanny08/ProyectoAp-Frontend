package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.SobreMi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISobreMiRepository extends JpaRepository <SobreMi,Integer>{
    
}