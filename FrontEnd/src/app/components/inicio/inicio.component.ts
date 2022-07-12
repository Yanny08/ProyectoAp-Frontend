import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/Models/persona.model';
import { PersonaService } from 'src/app/Services/persona.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  
  personas: Persona[];
  Persona = new Persona();
  closeResult: string;
  editForm!: FormGroup;
  private deleteId: number;
  base64:string="";
  
  barraActiva: boolean = false;
  
  mostrarBarra():void {
    this.barraActiva = !this.barraActiva;
  }

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private form: FormBuilder,
    private PersonaService: PersonaService,
    public httpClient:HttpClient) {
   
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.PersonaService.getPersona().subscribe(data => {this.personas = data})
    this.editForm = this.form.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      img: ['', Validators.required],
      
    });
  }
  


openModal(targetModal: any) {
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'

  });
}

obtener($event:any){
  this.base64=$event[0].base64;
  this.editForm.value.img=this.base64;
 }


  openEdit(targetModal: any, persona:Persona) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      img: persona.img,
    
    });

   }

  


  guardar(){
    const url = 'http://localhost:8080/personas/crear';
    // this.editForm.value.img=this.base64;
    console.log(this.editForm.value);
     this.httpClient.post(url, this.editForm.value).subscribe(res=>{this.Persona!=res,
    this.ngOnInit();
  })
    this.modalService.dismissAll();
  }
  

  openDelete(targetModal, persona:Persona) {
    this.deleteId= persona.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/personas/' +  'borrar/'+ this.deleteId ;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  


