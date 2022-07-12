package com.portfolio.BackEnd.Repository;

import com.portfolio.BackEnd.Entity.ResumenEdu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IResumenEduRepository extends JpaRepository <ResumenEdu,Integer>{
    
}
