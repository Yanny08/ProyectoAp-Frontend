package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.SobreMi;
import com.portfolio.BackEnd.Interface.ISobreMiService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SobreMiController {

    @Autowired ISobreMiService isobreMiService;

    @GetMapping("sobreMi/traer")
    public List<SobreMi> getSobreMi() {
        return isobreMiService.getSobreMi();
    }

    @PostMapping("/sobreMi/crear")
    public void createSobreMi(@RequestBody SobreMi sobreMi) {
        isobreMiService.saveSobreMi(sobreMi);
    }

    @DeleteMapping("/sobreMi/borrar/{id}")
    public void deleteSobreMi(@PathVariable Integer id){
        isobreMiService.deleteSobreMi(id);
    
    }
    
    @PutMapping("/sobreMi/editar/{id}")
    public SobreMi editSobreMi(@PathVariable Integer id,
                              @RequestBody SobreMi sobreMi){
        sobreMi.setId(id);
        
        isobreMiService.saveSobreMi(sobreMi);
        return sobreMi;
    }
    
    @GetMapping(path = {"/sobreMi/{id}"})
    public SobreMi listarId(@PathVariable("id")int id){
        return isobreMiService.findSobreMi(id);
    }
}