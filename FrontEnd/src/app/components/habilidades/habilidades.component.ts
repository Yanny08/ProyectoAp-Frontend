import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/Models/habilidades.model';
import {HabilidadService} from 'src/app/Services/habilidad.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidades:  Habilidad[];
  Habilidad = new Habilidad();
  closeResult: string;
  editForm!: FormGroup;
  private deleteId: number;
  base64:string="";
  
  isAdmin = false;
  roles: string[];

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private HabilidadService: HabilidadService,
    private tokenService: TokenService,
    public httpClient:HttpClient) {
   
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.getHabilidad();
    this.editForm = this.fb.group({
      id: [''],
      tecnologia: [''],
      porcentaje: [''],
      img: [''],
      
    });

    //  TOKEN
     if (this.tokenService.getToken()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  public getHabilidad(){
    this.HabilidadService.getHabilidad().subscribe(data => {this.habilidades = data});
    console.log(this.habilidades)
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
    const url = 'http://localhost:8080/habilidades/crear';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // recargar la tabla
      });
    this.base64='';
    this.modalService.dismissAll();

  }

 //Modal Editar
 
 modalEdit(targetModal, habilidad:Habilidad) {
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.patchValue( {
    id: habilidad.id,
    tecnologia: habilidad.tecnologia,
    porcentaje: habilidad.porcentaje,
    img: habilidad.img,
  });
 }

 guardar(){
  const editURL = 'http://localhost:8080/habilidades/'+'editar/'+this.editForm.value.id ;
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }
  
    // Modal Eliminar

  modalBorrar(targetModal, habilidad:Habilidad) {
    this.deleteId= habilidad.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  borrar() {
    const deleteURL = 'http://localhost:8080/habilidades/' +  'borrar/'+ this.deleteId ;
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
