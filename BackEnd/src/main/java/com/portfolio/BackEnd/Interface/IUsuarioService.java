package com.portfolio.BackEnd.Interface;

import com.portfolio.BackEnd.Entity.Usuario;
import java.util.List;

public interface IUsuarioService {
    
    public List<Usuario> getUsuario();
    
    public void saveUsuario(Usuario Usuario);
    
    public void deleteUsuario(int id);
   
    public Usuario findUsuario(int id);
    
}
