import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {element} from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {

  toDoListAray: any[];
  constructor(private  todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getToDoList().snapshotChanges()
      .subscribe((item: any) => {
        this.toDoListAray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x.$key = element.key;
          this.toDoListAray.push(x);
        });

        this.toDoListAray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }
  onAdd(itemTitle)
  {
    this.todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.todoService.checkOrUncheckTitle($key, !isChecked);
  }
  onDelete($key: string)
  {
    this.todoService.removeTitle($key);
  }

}
