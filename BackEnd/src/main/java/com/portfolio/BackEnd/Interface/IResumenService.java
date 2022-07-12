package com.portfolio.BackEnd.Interface;

import com.portfolio.BackEnd.Entity.Resumen;
import java.util.List;

public interface IResumenService {
    
    public List<Resumen> getResumen();

    public void saveResumen(Resumen resumen);

    public void deleteResumen(int id);

    public Resumen findResumen(int id);
}
