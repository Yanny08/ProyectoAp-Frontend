import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResumenEdu } from 'src/app/Models/resumenEdu.model';
import { ResumenEduService } from 'src/app/Services/resumen-edu.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-resumen-edu',
  templateUrl: './resumen-edu.component.html',
  styleUrls: ['./resumen-edu.component.css']
})
export class ResumenEduComponent implements OnInit {

  resumenEdu: ResumenEdu[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;

  isAdmin = false;
  roles: string[];
  
  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private resumenEduService: ResumenEduService,
    private tokenService: TokenService,
    public httpClient: HttpClient) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getResumenEdu();

    this.editForm = this.fb.group({
      id: [''],
      titulo: [''],
      institucion: [''],
      fechaIni: [''],
      fechaFin: [''],
      descripcion: [''],
    });

    
   //  TOKEN
   this.roles = this.tokenService.getAuthorities();
   this.roles.forEach(rol => {
     if (rol === 'ROLE_ADMIN') {
       this.isAdmin = true;
     }
   });
  }

  public getResumenEdu(){
    this.resumenEduService.getResumenEdu().subscribe(data => { this.resumenEdu = data });
     // console.log(this.resumenEdu)
  }

 
 //Modal Agregar
  modalAgregar(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.editForm.get('porcentaje').setValue(0)
    // this.editForm.get('titulo').setValue("")
  }

  enviar(event:Event) {
    // console.log(f.form.value);
    event.preventDefault()
    if(this.editForm.valid){
    this.resumenEduService.addResumenEdu(this.editForm.value)
      .subscribe((result) => {
        this.ngOnInit(); // recargar la tabla
      });
    }
    this.modalService.dismissAll(); // desaparece el modal
  }


 //Modal Editar
  modalEdit(targetModal, resumenEdu: ResumenEdu) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: resumenEdu.id,
      titulo: resumenEdu.titulo,
      institucion: resumenEdu.institucion,
      fechaIni: resumenEdu.fechaIni,
      fechaFin: resumenEdu.fechaFin,
      descripcion: resumenEdu.descripcion,
    });
    // console.log(this.editForm.value);
  }

  editar() {  
    this.resumenEduService.updateResumenEdu(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


   // Modal Eliminar

  modalBorrar(targetModal, resumenEdu: ResumenEdu) {
    this.deleteId = resumenEdu.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  borrar() {
    this.resumenEduService.deleteResumenEdu(this.deleteId)
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


