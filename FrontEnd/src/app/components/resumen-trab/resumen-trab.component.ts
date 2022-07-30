import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  ResumenTrab = new ResumenTrab();
  closeResult: string;
  trabForm: FormGroup;
  private deleteId: number;

  isAdmin = false;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private form: FormBuilder,
    private ResumenTrabService: ResumenTrabService,
    private tokenService: TokenService,
    public httpClient: HttpClient) {

    config.backdrop = 'static';
    config.keyboard = false;
  }



  ngOnInit(): void {
    this.ResumenTrabService.getResumenTrab().subscribe(data => { this.resumenTrab = data })
    this.trabForm = this.form.group({
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


  // Submit(){
  //   console.log(this.editForm.value);
  // }

  openEdit(targetModal, resumenTrab: ResumenTrab) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.trabForm.patchValue({
      id: resumenTrab.id,
      puesto: resumenTrab.puesto,
      organismo: resumenTrab.organismo,
      fechaIni: resumenTrab.fechaIni,
      fechaFin: resumenTrab.fechaFin,
      descripcion: resumenTrab.descripcion,
    });
  }

  guardar() {
    const url = 'http://localhost:8080/resumenTrab/crear';
    console.log(this.trabForm.value);
    this.httpClient.post(url, this.trabForm.value).subscribe(res => {
      this.resumenTrab != res,
      this.ngOnInit();
    })
    this.modalService.dismissAll();
  }



  editar() {
    const editURL = 'http://localhost:8080/resumenTrab/' + 'editar/' + this.trabForm.value.id;
    this.httpClient.put(editURL, this.trabForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, resumenTrab: ResumenTrab) {
    this.deleteId = resumenTrab.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/resumenTrab/' + 'borrar/' + this.deleteId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
