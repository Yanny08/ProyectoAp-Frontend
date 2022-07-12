import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumenComponent } from './components/resumen/resumen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { HttpClientModule } from '@angular/common/http';
import { ResumenEduComponent } from './components/resumen-edu/resumen-edu.component';
import { ResumenTrabComponent } from './components/resumen-trab/resumen-trab.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SobreMiComponent,
    HabilidadesComponent,
    ProyectosComponent,
    ContactoComponent,
    ResumenComponent,
    ResumenEduComponent,
    ResumenTrabComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlifeFileToBase64Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
