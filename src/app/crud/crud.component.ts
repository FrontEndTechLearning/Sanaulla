import { Component, OnInit } from '@angular/core';
import data from '../../data/users.json';

import {CustomToastService} from '../services/custom-toast.service'

interface Users {
  id: number;
  name: string;
  email:string;
  gender: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})


export class CrudComponent implements OnInit {
  users: Users[] = [];


  constructor( private toasterService : CustomToastService) { }

  ngOnInit(): void {
    this.users = data
  }
  onDeleteUser(selectedUserId: number) {
    try {
    const userListAfterDeletion = this.users.filter( (eachUser) => eachUser.id != selectedUserId);
   
    this.users = userListAfterDeletion;
    this.toasterService.showSuccess('user has been deleted successfully', 'crud.com')
    } catch(e){
      this.toasterService.showError('error while deleting a user{{}}','crud.com')

    }

  }

}
