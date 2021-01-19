import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./../../app.component.css', './welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	drop_class = false;

	constructor(
		private router: Router
	) {}

	ngOnInit() {
	}

	/**
	 * Redirecționare la pagina de autentificare
	 */
	clickEvent() {
		this.drop_class = true;
		setTimeout(() => {this.router.navigate(['login']);}, 1000);
	}
}
