package com.portfolio.BackEnd.Interface;

import com.portfolio.BackEnd.Entity.SobreMi;
import java.util.List;

public interface ISobreMiService {
    
    public List<SobreMi> getSobreMi();
    
    public void saveSobreMi(SobreMi sobreMi);
    
    public void deleteSobreMi(int id);

    public SobreMi findSobreMi(int id);
    
}
