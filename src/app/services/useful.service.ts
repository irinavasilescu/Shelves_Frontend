import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { MatSnackBarConfig, MatSnackBar, MatDialog } from '@angular/material';
import { MainDialogComponent } from '../dialogs/main-dialog/main-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class UsefulService {

	public message : Subject<string>  = new Subject<string>();

	constructor(
		public router: Router,
		public snackBar: MatSnackBar,
		public dialog: MatDialog
	) { }

	/**
	 * Navigarea la o anumită pagină
	 * @param path 
	 */
	navigateTo(path: string) {
		this.router.navigate([path]);
	}

	/**
	 * Componenta cu ajutorul cărei i se afișează utilizatorului mesaje
	 * de succes, de eroare sau informaționale în funcția de rezultatul
	 * acțiunii efectuate
	 * @param message 
	 * @param outcome 
	 */
	openSnackBar(message: string, outcome: string) {
		let config = new MatSnackBarConfig();
		config.duration = 8000;
		switch (outcome) {
			case 'succes': 	{ config.panelClass = ['style-succes'];  break; }
			case 'error':  	{ config.panelClass = ['style-error'];   break; }
			case 'message': { config.panelClass = ['style-message']; break; }
		}
		this.snackBar.open(message, undefined, config);
	}

	/**
	 * Emiterea unui mesaj între două componente
	 * @param message 
	 */
	sendMessage(message: string) {
    	this.message.next(message);
	  }
	 
	/**
	 * Recepționarea unui mesaj emis de o componentă
	 */
	getMessage(): Observable<any> {
    	return this.message.asObservable();
  	}

	/**
	 * Deschiderea dialogului, păstrând aceleași configurări
	 * @param data 
	 * @param component 
	 */
	openDialog(data, component): void {
		let dialogRef = this.dialog.open(component, {data: data});
		dialogRef.updateSize('700px');
	}

	/**
	 * Golirea obiectului ce cuprinde categoriile ca proprietăți
	 * @param genres 
	 */
	emptyCategoriesObject(genres) {
		let object = {};
		genres.forEach(genre => object[genre] = [])
		return object;
	}
}
