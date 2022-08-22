import { HttpClient } from '@angular/common/http';
import { Component,ElementRef,OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/Models/persona.model';
import { PersonaService } from 'src/app/Services/persona.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  personas:Persona[];
  persona: Persona =new Persona();
  closeResult: string;
  editForm: FormGroup;
  base64Img1: String = "";
  base64Img2: String = "";
 

  isAdmin = false;
  roles: string[];
  
  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router,
    private tokenService: TokenService,
    public httpClient: HttpClient) {
    // personaliza los valores predeterminados de los modales
    config.backdrop = 'static';
    config.keyboard = false;
  }

  barraActiva: boolean = false;

  mostrarBarra(): void {
    this.barraActiva = !this.barraActiva;
  }

  ngOnInit(): void {
    this.getPersona();
    this.editForm = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(15)]],
      apellido: ['', [Validators.required, Validators.maxLength(15)]],
      imgPerfil: ['', [Validators.required]],
      imgBanner: ['', [Validators.required]],
    });
   
    //  TOKEN
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  // LOGIN
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login'])
  }

  public getPersona() {
    this.personaService.getPersona().subscribe(data => { this.personas = data });
  }


  //Imagenes en Base64
  obtener(e:any):void {
    this.base64Img1=e[0].base64;
    this.editForm.value.imgPerfil=this.base64Img1;
   }
   
  obtener2(e:any):void {
    this.base64Img2= e[0].base64;
    this.editForm.value.imgBanner=this.base64Img2;
  }

  //Modal Editar
  modalEdit(targetModal, persona: Persona) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      imgPerfil: persona.imgPerfil,
      imgBanner: persona.imgBanner,
    });
  }

  editar() {
    this.personaService.updatePersona(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}



