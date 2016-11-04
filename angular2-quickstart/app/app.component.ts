import { Component } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './services/hero.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.template.html',
    styleUrls: ['app/app.component.css'],
    providers: [HeroService]
})

export class AppComponent implements OnInit {
    constructor(private heroService: HeroService) {

    }

    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }
}

