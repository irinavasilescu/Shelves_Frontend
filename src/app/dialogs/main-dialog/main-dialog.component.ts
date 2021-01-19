import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsefulService } from 'src/app/services/useful.service';
import { BookModel } from 'src/app/models/Models.model';

@Component({
	selector: 'app-main-dialog',
	templateUrl: './main-dialog.component.html',
	styleUrls: ['./main-dialog.component.css', './../../app.component.css'],
	providers: [ NotificationsService ]
})
export class MainDialogComponent implements OnInit {

	userId = localStorage.getItem('id');
	bookId = this.data.book.id;
	bookIdsOnShelf: any;
	isOnShelf: boolean;
	
	constructor(
		public router: Router,
		public dialogRef: MatDialogRef<MainDialogComponent>,
		public booksService: BooksService,
		public usersService: UsersService,
		public notificationsService: NotificationsService,
		public snackBar: MatSnackBar,
		public usefulService: UsefulService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	/**
	 * Navigarea la pagina de citire în funcție de id-ul cărții.
	 */
	navigateToReadingPage() {
		this.router.navigate(['read/' + this.data.book.id]);
	}

	/**
	 * Închiderea dialogului.
	 */
	closeDialog(){
		this.dialogRef.close();
	}

	/**
	 * Adăugarea unei cărți în raftul utilizatorului.
	 * Se efectuează o cerere de tip POST cu id-ul utilizatorului și id-ul cărții.
	 * În funcție de rezultatul cererii, utilizatorul este notificat cu un mesaj sugestiv.
	 */
	addToShelf() {
		this.booksService.addToShelf(+this.userId, this.bookId).subscribe(
			succes => this.usefulService.openSnackBar("Book successfully added to your shelf! You'll find it in My Shelf tab.", 'succes'),
			error => this.usefulService.openSnackBar('There has been an error with your request. Please try again later.', 'error')
		);
	}

	/**
	 * Eliminarea unei cărți din raftul utilizatorului.
	 * Se efectuează o cerere de tip POST cu id-ul utilizatorului și id-ul cărții.
	 * În funcție de rezultatul cererii, utilizatorul este notificat cu un mesaj sugestiv.
	 */
	removeFromShelf() {
		this.booksService.removeFromShelf(+this.userId, this.bookId).subscribe(
			succes => this.usefulService.openSnackBar("Book successfully removed from your shelf!", 'succes'),
			error => this.usefulService.openSnackBar('There has been an error with your request. Please try again later.', 'error')
		)
	}

	/**
	 * Verificarea existenței cărții în raftul utilizatorului.
	 * Verificarea este necesară pentru a determina ce operație poate fi efectuată din dialog:
	 * adăugare în raft sau eliminare din raft.
	 */
	checkBookOnShelf() {
		this.booksService.listShelf(this.userId).subscribe(resp => {
			this.bookIdsOnShelf = resp.map(book => book.id);
			console.log("Books on shelf", this.bookIdsOnShelf);
			this.isOnShelf = this.bookIdsOnShelf.some(id => id == this.bookId);
			console.log('IS ON SHELF', this.isOnShelf);
		});
	}

	ngOnInit() {
		this.checkBookOnShelf();
	}

}
