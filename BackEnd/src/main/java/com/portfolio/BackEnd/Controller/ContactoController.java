package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.Contacto;
import com.portfolio.BackEnd.Interface.IContactoService;
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
public class ContactoController {

    @Autowired IContactoService icontactoService;

    @GetMapping("contactos/traer")
    public List<Contacto> getContacto() {
        return icontactoService.getContacto();
    }

    @PostMapping("/contactos/crear")
    public void createContacto(@RequestBody Contacto contacto) {
        icontactoService.saveContacto(contacto);
    }

    @DeleteMapping("/contactos/borrar/{id}")
    public void deleteContacto(@PathVariable Integer id){
        icontactoService.deleteContacto(id);
    
    }
    
    @PutMapping("/contactos/editar/{id}")
    public Contacto editContacto(@PathVariable Integer id,
                              @RequestBody Contacto contacto){
        contacto.setId(id);
        
        icontactoService.saveContacto(contacto);
        return contacto;
    }
    
    @GetMapping(path = {"/contactos/{id}"})
    public Contacto listarId(@PathVariable("id")int id){
        return icontactoService.findContacto(id);
    }
}