import { Injectable } from '@angular/core';
import { ValuesService } from './values.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	constructor(
		private valuesService: ValuesService,
		private http: HttpClient
	) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		})
	};

	/**
	 * Înregistrarea unui nou utilizator.
	 * Se furnizează toate informațiile necesare pentru crearea unui nou cont:
	 * nume de utilizator, parolă, prenume, nume, email
	 * Se efectuează o cerere de tip POST la resursa "/index.php?r=users/signup". 
	 * @param username 
	 * @param pass 
	 * @param firstName 
	 * @param lastName 
	 * @param email 
	 */
	storeUser(username: string, pass: string, firstName: string, lastName: string, email: string): Observable<any> {
		let req = {
			'username': username,
			'f_name': firstName,
			'l_name': lastName,
			'email': email,
			'pass': pass
		}

		return this.http.post(
			this.valuesService.urlStoreUsers,
			req,
			this.httpOptions
		)
	}

	/**
	 * Autentificarea unui utilizator.
	 * Se furnizează numele de utilizator și parola.
	 * Se efectuează o cerere de tip POST la resursa "/index.php?r=users/login".
	 * @param username 
	 * @param pass 
	 */
	login(username: string, pass: string): Observable<any> {
		let req = {
			'username': username,
			'pass': pass
		}

		return this.http.post(
			this.valuesService.urlLoginUser,
			req,
			this.httpOptions
		)
	}

	/**
	 * Se verifică dacă userul este autentificat.
	 * Se efectuează o cerere de tip GET la resursa "/index.php?r=users/checklogin".
	 */
	checkLogin(): Observable<any> {
		return this.http.get(this.valuesService.urlCheckLogin);
	}

	/**
	 * Delogarea utilizatorului.
	 * Se efectuează o cerere de tip GET la resursa "/index.php?r=users/logout".
	 */
	logout(): Observable<any> {
		return this.http.get(this.valuesService.urlLogoutUser);
	}

	/**
	 * Obținerea informațiilor utilizatorului pe baza id-ului utilizatorului.
	 * Se efectuează o cerere de tip GET la resursa "/index.php?r=users/index"
	 * @param id 
	 */
	getCurrentUser(id): Observable<any> {
		return this.http.get(this.valuesService.urlIndexUser + '&id=' + id);
	}
}
