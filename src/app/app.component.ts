import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from './services/task.service';
import * as data from './services/sampleTask.json';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Thoughti-Task'
  TaskForm: FormGroup;
  maxChars = 200;
  // chars = 0;



  taskImportant: boolean = false;
  submitted: boolean;
  TaskData: any = data['default'];
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toastr: ToastrService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.TaskForm = this.formBuilder.group({
      Task: ['', Validators.required],
      Expiry_date: ['', Validators.required],
      User: [, Validators.required],
      Important: [false]
    })
  }

  /**
   * Check whether the task is important or not based on flag selection
   */
  important(value) {
    this.taskImportant = value;
    this.TaskForm.get('Important').setValue(value)
  }

  /**
   * Add a new task to JSON file
   */
  submitTask() {
    this.submitted = true;
    if (this.TaskForm.valid) {
      this.taskService.addTask(this.TaskForm.value);
      this.TaskForm.reset();
      this.taskImportant = false;
      this.submitted = false;
    }
  }

  /**
   * Removing the task from JSON file
   */
  remove(i) {
    this.taskService.removeTask(i);
  }

  /**
   * Returning the form controls
   */
  get taskControls() {
    return this.TaskForm.controls;
  }

  ngAfterViewInit(){
    this.TaskData.Tasks.forEach(element => {
      console.log(element,"Item")
      if(element.Important=== true){
      this.toastr.success(element.Task)
      }
    })
  }

}
