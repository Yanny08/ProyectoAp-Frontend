import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SobreMi } from 'src/app/Models/sobre-mi.model';
import { SobreMiService } from 'src/app/Services/sobre-mi.service';

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
  


  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private form: FormBuilder,
    private SobreMiService: SobreMiService,
    public httpClient:HttpClient) {
   
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.SobreMiService.getSobreMi().subscribe(data => {this.sobreMi = data})
    this.editForm = this.form.group({
      id: [''],
      linkGit: ['', Validators.required],
      linkDisc: ['', Validators.required],
      linkLinke: ['', Validators.required],
      descripcion: ['', Validators.required],
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


  openEdit(targetModal, sobreMi: SobreMi) {
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

   obtener($event:any){
    this.base64=$event[0].base64;
    this.editForm.value.img=this.base64;
   }
  

  guardar(){
    const url = 'http://localhost:8080/sobreMi/crear';
    console.log(this.editForm.value);
     this.httpClient.post(url, this.editForm.value).subscribe(res=>{this.SobreMi!=res,
    this.ngOnInit()});
    this.modalService.dismissAll();
  
  }

  openDelete(targetModal, sobreMi:SobreMi) {
    this.deleteId= sobreMi.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/sobreMi/' +  'borrar/'+ this.deleteId ;
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


