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
  closeResult: string;
  editForm: FormGroup;
  imagen64:String="";
  
  isAdmin = false;
  roles: string[];

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private sobreMiService: SobreMiService,
    private tokenService:TokenService,
    public httpClient:HttpClient) {
   // personaliza los valores predeterminados de los modales
    config.backdrop = 'static';
    config.keyboard = false;
  }

  
  ngOnInit(): void {
    this.getSobreMi();

    this.editForm = this.fb.group({
      id: [''],
      linkGit: ['', [Validators.maxLength(100)]],
      linkDisc: ['', [Validators.maxLength(100)]],
      linkLinke: ['', [Validators.maxLength(100)]],
      linkCv: ['', [Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      img: [''],
    });

     //  TOKEN
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getSobreMi(){
    this.sobreMiService.getSobreMi().subscribe(data => { this.sobreMi = data });
   
  }
  
  //Imagen Base64
  obtener(e:any): void {
    this.imagen64=e[0].base64;
    this.editForm.value.img=this.imagen64;
   }

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
      linkCv: sobreMi.linkCv,
      descripcion: sobreMi.descripcion,
      img: sobreMi.img,
    });
   }


   editar() {  
    this.sobreMiService.updateSobreMi(this.editForm.value)
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


