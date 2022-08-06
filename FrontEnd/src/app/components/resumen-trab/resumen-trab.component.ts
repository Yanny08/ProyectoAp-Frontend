import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResumenTrab } from 'src/app/Models/resumenTrab.model';
import { ResumenTrabService } from 'src/app/Services/resumen-trab.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-resumen-trab',
  templateUrl: './resumen-trab.component.html',
  styleUrls: ['./resumen-trab.component.css']
})
export class ResumenTrabComponent implements OnInit {


  resumenTrab: ResumenTrab[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;

  isAdmin = false;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private form: FormBuilder,
    private resumenTrabService: ResumenTrabService,
    private tokenService: TokenService,
    public httpClient: HttpClient) {

    config.backdrop = 'static';
    config.keyboard = false;
  }



  ngOnInit(): void {
    this.getResumenTrab();
    this.editForm = this.form.group({
      id: [''],
      puesto: [''],
      organismo: [''],
      fechaIni: [''],
      fechaFin: [''],
      descripcion: [''],
    });

    
    // TOKEN
    if (this.tokenService.getToken()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  public getResumenTrab(){
    this.resumenTrabService.getResumenTrab().subscribe(data => { this.resumenTrab = data });
     // console.log(this.resumenEdu)

  }

  
  //Modal Agregar
  modalAgregar(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  enviar(f: NgForm) {
    console.log(f.form.value);
    this.resumenTrabService.addResumenTrab(f.value)
      .subscribe((result) => {
        this.ngOnInit(); // recargar la tabla
      });
    this.modalService.dismissAll(); // desaparece el modal
  }

//Modal Editar

  modalEdit(targetModal, resumenTrab: ResumenTrab) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: resumenTrab.id,
      puesto: resumenTrab.puesto,
      organismo: resumenTrab.organismo,
      fechaIni: resumenTrab.fechaIni,
      fechaFin: resumenTrab.fechaFin,
      descripcion: resumenTrab.descripcion,
    });
    console.log(this.editForm.value);
  }

  editar() {  
    this.resumenTrabService.updateResumenTrab(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

 // Modal Eliminar

 modalBorrar(targetModal, resumenTrab: ResumenTrab) {
    this.deleteId = resumenTrab.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  borrar() {
    this.resumenTrabService.deleteResumenTrab(this.deleteId)
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
