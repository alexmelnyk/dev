"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by leha on 15.12.16.
 */
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'To Do List';
        this.tasks = [
            {
                title: "Task 1",
                description: "Blabla"
            },
            {
                title: "Task 2",
                description: "Blablabla"
            }
        ];
        this.addedTask = {
            addTitle: '',
            addDescription: ''
        };
    }
    AppComponent.prototype.onSelect = function (task) {
        this.selectedTask = task;
    };
    ;
    AppComponent.prototype.addTask = function (addedTask) {
        this.tasks.push({
            title: addedTask.addTitle,
            description: addedTask.addDescription
        });
        this.addedTask.addTitle = '';
        this.addedTask.addDescription = '';
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map