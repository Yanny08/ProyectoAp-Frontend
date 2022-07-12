package com.portfolio.BackEnd.Service;

import com.portfolio.BackEnd.Entity.SobreMi;
import com.portfolio.BackEnd.Interface.ISobreMiService;
import com.portfolio.BackEnd.Repository.ISobreMiRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpSobreMiService implements ISobreMiService  {
    @Autowired 
    ISobreMiRepository isobreMiRepository;

   @Override
    public List<SobreMi> getSobreMi() {
      List<SobreMi> sobreMi = isobreMiRepository.findAll();
      return sobreMi;
    }

    @Override
    public void saveSobreMi(SobreMi sobreMi) {
      isobreMiRepository.save(sobreMi);
    }

    @Override
    public void deleteSobreMi(int id) {
       isobreMiRepository.deleteById(id);
    }

    @Override
    public SobreMi findSobreMi(int id) {
       SobreMi sobreMi = isobreMiRepository.findById(id).orElse(null);
       return sobreMi;
    }

}

