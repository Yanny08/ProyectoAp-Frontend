package com.portfolio.BackEnd.Interface;

import com.portfolio.BackEnd.Entity.Persona;
import java.util.List;

public interface IPersonaService {

    public List<Persona> getPersona();

    public void savePersona(Persona persona);

    public void deletePersona(int id);

    public Persona findPersona(int id);
}
