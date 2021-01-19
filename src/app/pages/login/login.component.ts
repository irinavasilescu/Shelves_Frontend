import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { UsefulService } from 'src/app/services/useful.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [
		'./login.component.scss',
		'./../../app.component.css'
	]
})
export class LoginComponent implements OnInit {

	username: string;
	password: string;
	wrong: boolean = false;

	constructor(
		private usersService: UsersService,
		private router: Router,
		public snackBar: MatSnackBar,
		public usefulService: UsefulService
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
	 * Efectuarea autentificării utilizatorului.
	 * Se verifică faptul că variabilele username și password sunt definite.
	 * Se realizează o cerere de tip POST pentru validarea credențialelor.
	 * În funcție de erorile obținute, vor fi afișate mesaje sugestive.
	 * În cazul autentificării cu succes, utilizatorul este redirecționat la pagina principală.
	 */
	login() {
		if(this.username && this.password) {
			this.usersService.login(this.username, this.password).subscribe(
				resp => {
					console.log('RASPUNS USER LOGIN', resp)
					if (resp.status === 'ok' && resp.message === "Logged in successfully") {
						localStorage.setItem('id', resp.data);
						this.router.navigate(['/main']);
					} else {
						this.wrong = true;
						this.usefulService.openSnackBar('Wrong username or password! Make sure you typed everything correctly.', 'error');
					}
				},
				error => {
					this.usefulService.openSnackBar("There has been an error with your request. Please try again later.", 'error')
				}
			)			
		} else {
			this.usefulService.openSnackBar('All fields are required in order to log in! Please try again.', 'error');
		}
	}
}
