package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.Resumen;
import com.portfolio.BackEnd.Entity.ResumenEdu;
import com.portfolio.BackEnd.Interface.IResumenEduService;
import com.portfolio.BackEnd.Interface.IResumenService;
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
public class ResumenEduController {
    
  @Autowired IResumenEduService iresumenEduService;

    @GetMapping("resumenEdu/traer")
    public List<ResumenEdu> getResumenEdu() {
        return iresumenEduService.getResumenEdu();
    }

    @PostMapping("resumenEdu/crear")
    public void createResumenEdu(@RequestBody ResumenEdu resumenEdu) {
        iresumenEduService.saveResumenEdu(resumenEdu);
    }

    @DeleteMapping("/resumenEdu/borrar/{id}")
    public void deleteResumenEdu(@PathVariable Integer id){
        iresumenEduService.deleteResumenEdu(id);
    
    }
    
    @PutMapping("/resumenEdu/editar/{id}")
    public ResumenEdu editResumenEdu(@PathVariable Integer id,
                              @RequestBody ResumenEdu resumenEdu){
        resumenEdu.setId(id);
        
        iresumenEduService.saveResumenEdu(resumenEdu);
        return resumenEdu;
    }
    
    @GetMapping(path = {"/resumenEdu/{id}"})
    public ResumenEdu listarId(@PathVariable("id")int id){
        return iresumenEduService.findResumenEdu(id);
    }
}  
