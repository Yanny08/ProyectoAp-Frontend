import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
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
  roles: string[];

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private resumenTrabService: ResumenTrabService,
    private tokenService: TokenService,
    public httpClient: HttpClient) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getResumenTrab();

    this.editForm = this.fb.group({
      id: [''],
      puesto: ['',[Validators.required, Validators.maxLength(20)]],
      organismo: ['',[Validators.required, Validators.maxLength(20)]],
      fechaIni: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      descripcion: ['',[Validators.maxLength(100)]],
    });

    
    //  TOKEN
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
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

  agregar() {
    this.resumenTrabService.addResumenTrab(this.editForm.value)
      .subscribe((result) => {
        this.ngOnInit(); // recargar la tabla
        this.modalService.dismissAll(); // desaparece el modal
      });
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
