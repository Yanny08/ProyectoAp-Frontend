package com.portfolio.BackEnd.Service;

import com.portfolio.BackEnd.Entity.ResumenTrab;
import com.portfolio.BackEnd.Interface.IResumenTrabService;
import com.portfolio.BackEnd.Repository.IResumenTrabRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpResumenTrabService implements IResumenTrabService {
    
    @Autowired
    IResumenTrabRepository iresumenTrabRepository;

    @Override
    public List<ResumenTrab> getResumenTrab() {
        List<ResumenTrab> resumenTrab = iresumenTrabRepository.findAll();
        return resumenTrab;
    }

    @Override
    public void saveResumenTrab(ResumenTrab resumenTrab) {
        iresumenTrabRepository.save(resumenTrab);
    }

    @Override
    public void deleteResumenTrab(int id) {
        iresumenTrabRepository.deleteById(id);
    }

    @Override
    public ResumenTrab findResumenTrab(int id) {
        ResumenTrab resumenTrab = iresumenTrabRepository.findById(id).orElse(null);
        return resumenTrab;
    }

}
