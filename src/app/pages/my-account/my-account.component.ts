import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.css', './../../app.component.css']
})
export class MyAccountComponent implements OnInit {

	userId: string;
	userInfo: any;
	showPage: boolean;

	constructor(
		public usersService: UsersService
	) { }

	ngOnInit() {
		this.start();
	}

	/**
	 * Obținerea id-ului utilizatorului din memoria locală a browserului.
	 * Obținerea informațiilor contului printr-o cerere de tip POST.
	 */
	start() {
		this.userId = localStorage.getItem('id');
		this.usersService.getCurrentUser(this.userId).subscribe(resp => {
			console.log('ACCOUNT INFO', resp);
			this.userInfo = resp;
			this.showPage = true;
		})
	}

}
