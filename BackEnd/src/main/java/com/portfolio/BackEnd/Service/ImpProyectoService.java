package com.portfolio.BackEnd.Service;

import com.portfolio.BackEnd.Entity.Proyecto;
import com.portfolio.BackEnd.Interface.IProyectoService;
import com.portfolio.BackEnd.Repository.IProyectoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImpProyectoService implements IProyectoService {

    @Autowired
    IProyectoRepository iproyectoRepository;

    @Override
    public List<Proyecto> getProyecto() {
        List<Proyecto> proyecto = iproyectoRepository.findAll();
        return proyecto;
    }

    @Override
    public void saveProyecto(Proyecto proyecto) {
        iproyectoRepository.save(proyecto);
    }

    @Override
    public void deleteProyecto(int id) {
        iproyectoRepository.deleteById(id);
    }

    @Override
    public Proyecto findProyecto(int id) {
        Proyecto proyecto = iproyectoRepository.findById(id).orElse(null);
        return proyecto;
    }

}

