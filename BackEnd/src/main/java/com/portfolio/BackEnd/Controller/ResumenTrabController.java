package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.Resumen;
import com.portfolio.BackEnd.Entity.ResumenTrab;
import com.portfolio.BackEnd.Interface.IResumenService;
import com.portfolio.BackEnd.Interface.IResumenTrabService;
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
public class ResumenTrabController {
    
  @Autowired IResumenTrabService iresumenTrabService;

    @GetMapping("resumenTrab/traer")
    public List<ResumenTrab> getResumenTrab() {
        return iresumenTrabService.getResumenTrab();
    }

    @PostMapping("resumenTrab/crear")
    public void createResumenTrab(@RequestBody ResumenTrab resumenTrab) {
        iresumenTrabService.saveResumenTrab(resumenTrab);
    }

    @DeleteMapping("/resumenTrab/borrar/{id}")
    public void deleteResumenTrab(@PathVariable Integer id){
        iresumenTrabService.deleteResumenTrab(id);
    
    }
    
    @PutMapping("/resumenTrab/editar/{id}")
    public ResumenTrab editResumenTrab(@PathVariable Integer id,
                              @RequestBody ResumenTrab resumenTrab){
        resumenTrab.setId(id);
        
        iresumenTrabService.saveResumenTrab(resumenTrab);
        return resumenTrab;
    }
    
    @GetMapping(path = {"/resumenTrab/{id}"})
    public ResumenTrab listarId(@PathVariable("id")int id){
        return iresumenTrabService.findResumenTrab(id);
    }
} 
