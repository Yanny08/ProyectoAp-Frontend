package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.Resumen;
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
public class ResumenController {

    @Autowired IResumenService iresumenService;

    @GetMapping("resumen/traer")
    public List<Resumen> getResumen() {
        return iresumenService.getResumen();
    }

    @PostMapping("resumen/crear")
    public void createResumen(@RequestBody Resumen resumen) {
        iresumenService.saveResumen(resumen);
    }

    @DeleteMapping("/resumen/borrar/{id}")
    public void deleteResumen(@PathVariable Integer id){
        iresumenService.deleteResumen(id);
    
    }
    
    @PutMapping("/resumen/editar/{id}")
    public Resumen editResumen(@PathVariable Integer id,
                              @RequestBody Resumen resumen){
        resumen.setId(id);
        
        iresumenService.saveResumen(resumen);
        return resumen;
    }
    
    @GetMapping(path = {"/resumen/{id}"})
    public Resumen listarId(@PathVariable("id")int id){
        return iresumenService.findResumen(id);
    }
}