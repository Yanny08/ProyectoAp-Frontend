package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.Habilidad;
import com.portfolio.BackEnd.Interface.IHabilidadService;
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


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class HabilidadController {

    @Autowired IHabilidadService ihabilidadService;

    @GetMapping("habilidades/traer")
    public List<Habilidad> getHabilidad() {
        return ihabilidadService.getHabilidad();
    }

    @PostMapping("/habilidades/crear")
    public void createHabilidad(@RequestBody Habilidad habilidad) {
        ihabilidadService.saveHabilidad(habilidad);
    }

    @DeleteMapping("/habilidades/borrar/{id}")
    public void deleteHabilidad(@PathVariable Integer id){
        ihabilidadService.deleteHabilidad(id);
    
    }
    
     @PutMapping("/habilidades/editar/{id}")
    public Habilidad editHabilidad(@PathVariable Integer id,
                              @RequestBody Habilidad habilidad){
        habilidad.setId(id);
        
        ihabilidadService.saveHabilidad(habilidad);
        return habilidad;
    }
    
    @GetMapping(path = {"/habilidades/{id}"})
    public Habilidad listarId(@PathVariable("id")int id){
        return ihabilidadService.findHabilidad(id);
    }
}