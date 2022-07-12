
package com.portfolio.BackEnd.Controller;

import com.portfolio.BackEnd.Entity.Usuario;
import com.portfolio.BackEnd.Interface.IUsuarioService;
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
public class UsuarioController {
    @Autowired IUsuarioService iusuarioService;
    
    @GetMapping("usuarios/traer")
    public List<Usuario> getUsuario(){
        return iusuarioService.getUsuario();
    }
    
    @PostMapping("usuarios/crear")
    public void createUsuario(@RequestBody Usuario usuario){
        iusuarioService.saveUsuario(usuario);
    }
    
    @DeleteMapping("/usuarios/borrar/{id}")
    public void deleteUsuario(@PathVariable Integer id){
        iusuarioService.deleteUsuario(id);
        
    }
    
  @PutMapping("/usuarios/editar/{id}")
    public Usuario editUsuario(@PathVariable Integer id,
                              @RequestBody Usuario usuario){
        usuario.setId(id);
        
        iusuarioService.saveUsuario(usuario);
        return usuario;
    }
    
    @GetMapping(path = {"/usuarios/{id}"})
    public Usuario listarId(@PathVariable("id")int id){
        return iusuarioService.findUsuario(id);
    }
}