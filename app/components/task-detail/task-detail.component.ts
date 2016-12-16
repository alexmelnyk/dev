/**
 * Created by leha on 15.12.16.
 */
import { Component, Input } from '@angular/core';

import {Task} from '../task/task';

@Component({
    moduleId: module.id,
    selector: 'task-detail',
    templateUrl: 'task-detail.component.template.html'
})

export class TaskDetail{

    @Input()
    task: Task;

};