/**
 * Created by leha on 15.12.16.
 */
import { Component } from '@angular/core';

import {Task} from '../task/task';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.template.html'
})

export class AppComponent {

    title = 'To Do List';
    tasks = [
        {
            title: "Task 1",
            description: "Blabla"
        },
        {
            title: "Task 2",
            description: "Blablabla"
        }
    ];
    selectedTask : Task;

    addedTask = {
        addTitle : '',
        addDescription : ''
    };

    onSelect(task: Task): void{
        this.selectedTask = task;
    };

    addTask(addedTask) : void{
        this.tasks.push({
            title: addedTask.addTitle,
            description: addedTask.addDescription
        });
        this.addedTask.addTitle = '';
        this.addedTask.addDescription = '';
    }

}