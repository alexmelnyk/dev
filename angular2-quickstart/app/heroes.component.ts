import { Component } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './services/hero.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.template.html',
    styleUrls: ['app/heroes.component.css'],
    providers: [HeroService]
})

export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService) {

    }

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

