package com.portfolio.BackEnd.Interface;

import com.portfolio.BackEnd.Entity.ResumenTrab;
import java.util.List;

public interface IResumenTrabService {
    public List<ResumenTrab> getResumenTrab();

    public void saveResumenTrab(ResumenTrab resumenTrab);

    public void deleteResumenTrab(int id);

    public ResumenTrab findResumenTrab(int id);
}
