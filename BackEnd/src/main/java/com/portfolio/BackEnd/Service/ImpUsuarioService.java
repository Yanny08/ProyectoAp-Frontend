package com.portfolio.BackEnd.Service;

import com.portfolio.BackEnd.Entity.Usuario;
import com.portfolio.BackEnd.Interface.IUsuarioService;
import com.portfolio.BackEnd.Repository.IUsuarioRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpUsuarioService implements IUsuarioService  {
    @Autowired IUsuarioRepository iusuarioRepository;

   @Override
    public List<Usuario> getUsuario() {
      List<Usuario> usuario = iusuarioRepository.findAll();
      return usuario;
    }

    @Override
    public void saveUsuario(Usuario usuario) {
      iusuarioRepository.save(usuario);
    }

    @Override
    public void deleteUsuario(int id) {
       iusuarioRepository.deleteById(id);
    }

    @Override
    public Usuario findUsuario(int id) {
       Usuario usuario = iusuarioRepository.findById(id).orElse(null);
       return usuario;
    }

}
