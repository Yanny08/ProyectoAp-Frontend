import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SobreMi } from 'src/app/Models/sobre-mi.model';
import { SobreMiService } from 'src/app/Services/sobre-mi.service';
import { TokenService} from 'src/app/Services/token.service'

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  sobreMi: SobreMi[];
  SobreMi = new SobreMi();
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  base64:string="";
  
  isAdmin = false;
  roles: string[];

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private SobreMiService: SobreMiService,
    private tokenService:TokenService,
    public httpClient:HttpClient) {
   // personalizar los valores predeterminados de los modales
    config.backdrop = 'static';
    config.keyboard = false;
  }

  
  ngOnInit(): void {
    this.getSobreMi();
    this.editForm = this.fb.group({
      id: [''],
      linkGit: [''],
      linkDisc: [''],
      linkLinke: [''],
      descripcion: [''],
      img: [''],
      
    });
    if(this.tokenService.getToken()){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
      }
  }
  public getSobreMi(){
    this.SobreMiService.getSobreMi().subscribe(data => (this.sobreMi = data));

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
  //  open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
   
  // onSubmit(f: NgForm) {
  //   f.form.value.imagen=this.base64;
  //   console.log(f.form.value);
  //   const url = 'http://localhost:8080/sobreMi/crear';
  //   this.httpClient.post(url, f.value)
  //     .subscribe((result) => {
  //       this.ngOnInit(); // recargar la tabla
  //     });
  //   this.modalService.dismissAll();
  // }

  //Modal Editar

  modalEdit(targetModal, sobreMi:SobreMi) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: sobreMi.id,
      linkGit: sobreMi.linkGit,
      linkDisc: sobreMi.linkDisc,
      linkLinke: sobreMi.linkLinke,
      descripcion: sobreMi.descripcion,
      img: sobreMi.img,
    });
   }


  guardar(){
    const editUrl = 'http://localhost:8080/sobreMi/'+'editar/'+this.editForm.value.id;
     this.httpClient.put(editUrl, this.editForm.value)
     .subscribe((results) => {
    this.ngOnInit();
    this.modalService.dismissAll();
  });
  }

  //Modal Eliminar
  // modalBorrar(targetModal, sobreMi:SobreMi) {
  //   this.deleteId= sobreMi.id;
  //   this.modalService.open(targetModal, {
  //     backdrop: 'static',
  //     size: 'lg'
  //   });
  // }

  // onDelete() {
  //   const deleteURL = 'http://localhost:8080/sobreMi/' +  'borrar/'+ this.deleteId ;
  //   this.httpClient.delete(deleteURL)
  //     .subscribe((results) => {
  //       this.ngOnInit();
  //       this.modalService.dismissAll();
  //     });
  // }

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


