package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.Proyecto;
import com.portfolio.BackEnd.Interface.IProyectoService;
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
public class ProyectoController {

    @Autowired IProyectoService iproyectoService;

    @GetMapping("proyectos/traer")
    public List<Proyecto> getProyecto() {
        return iproyectoService.getProyecto();
    }

    @PostMapping("/proyectos/crear")
    public void createProyecto(@RequestBody Proyecto proyecto) {
        iproyectoService.saveProyecto(proyecto);
    }

    @DeleteMapping("/proyectos/borrar/{id}")
    public void deleteProyecto(@PathVariable Integer id){
        iproyectoService.deleteProyecto(id);
    
    }
    
    @PutMapping("/proyectos/editar/{id}")
    public Proyecto editProyecto(@PathVariable Integer id,
                              @RequestBody Proyecto proyecto){
        proyecto.setId(id);
        
        iproyectoService.saveProyecto(proyecto);
        return proyecto;
    }
    
    @GetMapping(path = {"/proyectos/{id}"})
    public Proyecto listarId(@PathVariable("id")int id){
        return iproyectoService.findProyecto(id);
    }
}