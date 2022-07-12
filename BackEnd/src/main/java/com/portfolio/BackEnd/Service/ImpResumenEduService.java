package com.portfolio.BackEnd.Service;

import com.portfolio.BackEnd.Entity.ResumenEdu;
import com.portfolio.BackEnd.Interface.IResumenEduService;
import com.portfolio.BackEnd.Repository.IResumenEduRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpResumenEduService implements IResumenEduService {
   
    @Autowired
    IResumenEduRepository iresumenEduRepository;

    @Override
    public List<ResumenEdu> getResumenEdu() {
        List<ResumenEdu> resumenEdu = iresumenEduRepository.findAll();
        return resumenEdu;
    }

    @Override
    public void saveResumenEdu(ResumenEdu resumenEdu) {
        iresumenEduRepository.save(resumenEdu);
    }

    @Override
    public void deleteResumenEdu(int id) {
        iresumenEduRepository.deleteById(id);
    }

    @Override
    public ResumenEdu findResumenEdu(int id) {
        ResumenEdu resumenEdu = iresumenEduRepository.findById(id).orElse(null);
        return resumenEdu;
    }

}
