import { Component, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Employee, EmpoyeeOperationService } from '../../services/empoyee-operation.service';

import { TransformURLService } from '../../services/transform-url.service';
import { Validators } from '@angular/forms';

import { CustomToastService } from '../../services/custom-toast.service'
import { ImageService } from '../../services/image.service';
import { RandomNumberGeneratorService } from '../../services/random-number-generator.service';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})


export class CrudComponent implements OnInit {
  Locations: any = ['Banglore', 'pune', 'hydrabad'];
  isValidated = false;

  employeeDetailsForm = this.fb.group({
    locations: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    name: ['', Validators.required],
    id: '',
    image: ''
  })

  tempEmployeeDetailsForm = this.fb.group({
    locations: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    name: ['', Validators.required],
    id: '',
    image: ''
  })

  selectedFile: ImageSnippet | undefined;
  users: Employee[] = [];
  selectedUser: any
  

  EmployeeResponseData: Employee[] = [];


  constructor(
    private toasterService: CustomToastService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private employeeService: EmpoyeeOperationService,
    private transformimageURLService: TransformURLService,
    private imageService: ImageService,
    private numbergenarator : RandomNumberGeneratorService,
  ) {
    this.getEmployeesByFetching();
  }

  getEmployeesByFetching(): void {
    this.employeeService.getEmployeesByFetching().subscribe(response => {
      this.users = response;
      this.EmployeeResponseData = response;
    })
  }

  changeLocation(event: any) {

    this.employeeDetailsForm.setValue({
      ...this.employeeDetailsForm.value,
      locations: event.target.value
    })


  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res: any) => {

        },
        (err: any) => {

        })
    });

    reader.readAsDataURL(file);
  }



  ngOnInit(): void {


  }
  getImage(urlPath: string) {
    return this.transformimageURLService.getTransformedImage(urlPath)

  }



  onDeleteUser(selectedUserId: number): void {
    try {
      const userListAfterDeletion = this.users.filter((eachUser) => eachUser.id != selectedUserId);

      this.employeeService.onEmployeeDelate(selectedUserId).subscribe((res) => {
        console.log('res is', res)
      })
      this.users = userListAfterDeletion;
      this.toasterService.showSuccess('user has been deleted successfully', 'crud.com',);

    } catch (e) {
      this.toasterService.showError('error while deleting a user', 'crud.com');

    }

  }





  onOpen(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result


  }
  resetValues() {
    this.employeeDetailsForm.setValue({
      email: '',
      gender: '',
      name: '',
      id: '',
      image: '',
      locations: ''
    })
    this.selectedUser = null;
  }

  onClose(closeModal: any) {
    this.resetValues()
    closeModal.dismiss('Cross Click');
  }

  onEditOfUser(selectedUser: any, content: any) {
    this.selectedUser = selectedUser;
    this.tempEmployeeDetailsForm = selectedUser;

    this.employeeDetailsForm.setValue({
      name: selectedUser?.name,
      email: selectedUser?.email,
      gender: selectedUser?.gender,
      id: selectedUser?.id,
      image: selectedUser?.imageUR ?? '',
      locations: selectedUser?.locations
    })

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    })

  }

  updateEmployee(updatingAnEmployee: any) {


   try{
    this.employeeService.onEmployeeUpdate(updatingAnEmployee.id, updatingAnEmployee);
    
    const ArrayAfterUpdate = this.users.map((employee: any) => {
      if (employee.id === updatingAnEmployee.id) {

        let tempObject = {};
        tempObject = updatingAnEmployee;
        return tempObject;
      }
      return employee;
    })
    
    

    // this.employeeService.postEmplyees(ArrayAfterUpdate).subscribe((res)=>{
    //   console.log('res is', res)
    // })

    this.users = ArrayAfterUpdate;

    this.getNotificationsOfStatus('Employee Has Been Updated Sucessfully', 'success')
  } catch{

  }
  }

  onSubmit(modal: any) {

    try {
      if (this.selectedUser) {
        this.tempEmployeeDetailsForm = this.selectedUser;

        this.updateEmployee(this.employeeDetailsForm.value)

      }
      else {

        this.addNewEmployee(modal);
      }

    } catch {
      this.getNotificationsOfStatus('Error Occured On This Action !!!', 'error')
    }


    this.onClose(modal)




  }

  getNotificationsOfStatus(content: any, type: any) {
    if (type === 'success') {
      this.toasterService.showSuccess(content, 'JWS.com')
    } else if(type === 'error') {
      this.toasterService.showError(content, 'JWS.com')
    }

  }

  addNewEmployee(modal: any) {


    try {
      const tempUserObject = this.employeeDetailsForm.value;

      // const size = this.users?.length - 1;
      tempUserObject.id = this.numbergenarator.getRandomNumber(10, 100)

      this.employeeService.addEmplyees(tempUserObject).subscribe((res) => {
        console.log('res is', res);
      })


      this.users.push(this.employeeDetailsForm.value)

      this.selectedUser = ''


      this.getNotificationsOfStatus('New Employee Has Been Added Successfully', 'success');
    } catch {
      this.getNotificationsOfStatus('New Employee Has Been Added Successfully', 'error');
    }

  }


  isButtonDisabled() {
    if(this.selectedUser) {

     return this.tempEmployeeDetailsForm.valid !== this.employeeDetailsForm.valid
    } else {
      return !this.employeeDetailsForm.valid
    }

    }
    

}
