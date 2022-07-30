import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/Models/proyecto.model';
import { ProyectoService } from 'src/app/Services/proyecto.service';
import { TokenService } from 'src/app/Services/token.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[];
  Proyecto = new Proyecto();
  closeResult: string;
  editForm!: FormGroup;
  private deleteId: number;
  base64:string="";
  
  isAdmin = false;
  roles: string[];

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private ProyectoService: ProyectoService,
    private tokenService: TokenService,
    public httpClient:HttpClient) {
   
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.getProyecto();
    this.editForm = this.fb.group({
      id: [''],
      titulo: [''],
      subtitulo: [''],
      img: [''],
      
    });

    //  TOKEN
     if (this.tokenService.getToken()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  public getProyecto(){
    this.ProyectoService.getProyecto().subscribe(data => {this.proyectos = data});
    
    // this.roles = this.tokenService.getAuthorities();
    // this.roles.forEach(rol => {
    //   if (rol === 'ROLE_ADMIN') {
    //     this.isAdmin = true;
    //   }
    // });
  }

obtener($event:any){
  this.base64=$event[0].base64;
  this.editForm.value.img=this.base64;
 }

 //Modal Agregar
   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
   
  onSubmit(f: NgForm) {
    f.form.value.img=this.base64;
    
    console.log(f.form.value);
    const url = 'http://localhost:8080/proyectos/crear';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // recargar la tabla
      });
    this.base64='';
    this.modalService.dismissAll();

  }

 //Modal Editar
 
 modalEdit(targetModal, proyecto:Proyecto) {
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: proyecto.id,
    titulo: proyecto.titulo,
    subtitulo: proyecto.subtitulo,
    img: proyecto.img,
  });
 }

 guardar(){
  const editURL = 'http://localhost:8080/proyectos/'+'editar/'+this.editForm.value.id ;
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }
  
    // Modal Eliminar

  modalBorrar(targetModal, proyecto:Proyecto) {
    this.deleteId= proyecto.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  borrar() {
    const deleteURL = 'http://localhost:8080/proyectos/' +  'borrar/'+ this.deleteId ;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
