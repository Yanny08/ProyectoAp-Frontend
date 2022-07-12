package com.portfolio.BackEnd.Service;

import com.portfolio.BackEnd.Entity.Resumen;
import com.portfolio.BackEnd.Interface.IResumenService;
import com.portfolio.BackEnd.Repository.IResumenRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImpResumenService implements IResumenService {

    @Autowired
    IResumenRepository iresumenRepository;

    @Override
    public List<Resumen> getResumen() {
        List<Resumen> resumen = iresumenRepository.findAll();
        return resumen;
    }

    @Override
    public void saveResumen(Resumen resumen) {
        iresumenRepository.save(resumen);
    }

    @Override
    public void deleteResumen(int id) {
        iresumenRepository.deleteById(id);
    }

    @Override
    public Resumen findResumen(int id) {
        Resumen resumen = iresumenRepository.findById(id).orElse(null);
        return resumen;
    }

}
