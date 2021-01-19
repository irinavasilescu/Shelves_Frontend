import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../services/books.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { UsefulService } from '../services/useful.service';
import { ValuesService } from '../services/values.service';

@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css', './../app.component.css']
})
export class NavigationComponent implements OnInit {

	constructor(
		public usefulService: UsefulService,
		public booksService: BooksService,
		public usersService: UsersService,
		public router: Router,
		public valuesService: ValuesService
	) { }

	ngOnInit() {
	}

	/**
	 * Navigarea la o altă pagină.
	 * @param path 
	 */
	navigateTo(path: string) {
		this.usefulService.navigateTo(path);
	}

	/**
	 * Emiterea unei mesaj utilizat la reîmprospătarea unei pagini,
	 * urmată de navigarea la o pagină.
	 * @param path 
	 */
	navigateToWithRefresh(path: string) {
		this.usefulService.sendMessage('restartBrowseCategory');
		this.usefulService.navigateTo(path);
	}

	/**
	 * Efectuarea delogării utilizatorului.
	 * Se efectuează o cerere HTTP pentru delogarea acestuia.
	 * Se redirecționează la pagina de autentificare.
	 */
	logout() {
		this.usersService.logout().subscribe();
		this.usefulService.navigateTo('login');
	}
}
