import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/Models/habilidades.model';
import { HabilidadService } from 'src/app/Services/habilidad.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidad: Habilidad[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;

  isAdmin = false;
  roles: string[];

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private HabilidadService: HabilidadService,
    private tokenService: TokenService,
    public httpClient: HttpClient) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getHabilidad();

    this.editForm = this.fb.group({
      id: [''],
      porcentaje: ['',[Validators.required,Validators.min(1)]],
      titulo: ['',[Validators.required, Validators.maxLength(15)]],
      icono: [''],
      color: [''],
    });

     
    //  TOKEN
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getHabilidad() {
    this.HabilidadService.getHabilidad().subscribe(data => { this.habilidad = data });
  }


  //Modal Agregar
  modalAgregar(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //Para que comience vacio
    this.editForm.get('porcentaje').setValue(0)
    this.editForm.get('titulo').setValue("")
    this.editForm.get('icono').setValue("")
    this.editForm.get('color').setValue("")
  }

  agregar() {
      this.HabilidadService.addHabilidad(this.editForm.value)
      .subscribe((result) => {
        this.ngOnInit(); // recargar la tabla
        this.modalService.dismissAll(); // desaparece el modal
      });
    }
  


  //Modal Editar
  modalEdit(targetModal, habilidad: Habilidad) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: habilidad.id,
      porcentaje: habilidad.porcentaje,
      titulo: habilidad.titulo,
      icono: habilidad.icono,
      color: habilidad.color,
    });
    // console.log(this.editForm.value);
  }

  editar() {
    this.HabilidadService.updateHabilidad(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
    // console.log(this.editForm.value);
    
  }


  // Modal Eliminar

  modalBorrar(targetModal, habilidad: Habilidad) {
    this.deleteId = habilidad.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  borrar() {
   this.HabilidadService.deleteHabilidad(this.deleteId)
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
