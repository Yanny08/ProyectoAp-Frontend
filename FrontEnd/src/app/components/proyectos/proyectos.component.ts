import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
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
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  imagen64: String = "";

  isAdmin = false;
  roles: string[];

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private ProyectoService: ProyectoService,
    private tokenService: TokenService,
    public httpClient: HttpClient) {

    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
    this.getProyecto();

    this.editForm = this.fb.group({
      id: [''],
      titulo: ['', [Validators.required, Validators.maxLength(20)]],
      img: [''],
      descripcion: ['', [Validators.maxLength(500)]],
    });


    //  TOKEN
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

  }


  public getProyecto() {
    this.ProyectoService.getProyecto().subscribe(data => { this.proyectos = data });

  }



  //Imagen Base64
  obtener(e: any): void {
    this.imagen64 = e[0].base64;
    this.editForm.value.img = this.imagen64;
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
    this.editForm.value.img = this.imagen64;
    this.ProyectoService.addProyecto(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  //Modal Editar
  modalEdit(targetModal, proyecto: Proyecto) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: proyecto.id,
      titulo: proyecto.titulo,
      img: proyecto.img,
      descripcion: proyecto.descripcion,
    });
  }

  editar() {
    this.ProyectoService.updateProyecto(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  // Modal Eliminar
  modalBorrar(targetModal, proyecto: Proyecto) {
    this.deleteId = proyecto.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  borrar() {
    this.ProyectoService.deleteProyecto(this.deleteId)
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
