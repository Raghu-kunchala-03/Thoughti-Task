import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as data from './sampleTask.json';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
sampleTaskData= data

  constructor() { }

  removeTask(index){
    this.sampleTaskData['default'].Tasks.splice(index,1);
  }

  addTask(data){
    this.sampleTaskData['default'].Tasks.push(data);
  }
}
