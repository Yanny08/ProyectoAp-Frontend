package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.ResumenTrab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IResumenTrabRepository extends JpaRepository <ResumenTrab,Integer> {
    
}
