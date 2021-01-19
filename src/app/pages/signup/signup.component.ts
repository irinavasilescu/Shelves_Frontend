import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UsefulService } from 'src/app/services/useful.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [
		'./signup.component.scss',
		'./../../app.component.css'
	]
})
export class SignupComponent implements OnInit {
	f_name: string;
	l_name: string;
	username: string;
	email: string;
	password: string;
	wrong: boolean;

	constructor(
		private userService: UsersService,
		private snackBar: MatSnackBar,
		private usefulService: UsefulService
	) { }

	ngOnInit() { }

	/**
	 * Navigarea la o altă pagină
	 * @param path 
	 */
	navigateTo(path: string) {
		this.usefulService.navigateTo(path);
	}

	/**
	 * Efectuarea înregistrării unui nou utilizator.
	 * Se verifică faptul că variabilele f_name, l_name, username, email, password sunt definite.
	 * Se realizează o cerere de tip POST pentru adăugarea utilizatorului în tabela utilizatorilor.
	 * În funcție de erorile obținute, vor fi afișate mesaje sugestive.
	 * În cazul înregistrării cu succes, utilizatorul va fi notificat printr-un mesaj.
	 */
	signup() {
		if (this.f_name && this.l_name && this.username && this.email && this.password) {
			this.userService.storeUser(this.username, this.password, this.f_name, this.l_name, this.email).subscribe(
				resp => {
					if (resp.status && resp.status === 'ok') {
						this.usefulService.openSnackBar("User created successfully! You can start browsing SHELVES!", 'succes');
					}
					if (resp.status && resp.status === 'error') {
						this.wrong = true;
						this.usefulService.openSnackBar("Username or email already used. Please try again.", 'error');
					}
				},
				error => this.usefulService.openSnackBar("There has been an error with your request. Please try again later.", 'error')
			)
		} else {
			this.usefulService.openSnackBar("All fields are required in order to register! Please try again.", 'error');
		}
	}

}
