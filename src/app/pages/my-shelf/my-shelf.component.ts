import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatAccordion } from '@angular/material';
import { MainDialogComponent } from 'src/app/dialogs/main-dialog/main-dialog.component';
import { BooksService } from 'src/app/services/books.service';
import { UsefulService } from 'src/app/services/useful.service';
import { ValuesService } from 'src/app/services/values.service';

@Component({
	selector: 'app-my-shelf',
	templateUrl: './my-shelf.component.html',
	styleUrls: ['./my-shelf.component.css', './../../app.component.css']
})
export class MyShelfComponent implements OnInit {

	userId = localStorage.getItem('id');
	genres: any;
	allBooks: any[];
	allBooksBeforeFiltering: any[];
	panelOpenState = false;
	@ViewChild('accordion',{static:true}) Accordion: MatAccordion;
	filterBook: string;
	filterAuthor: string;
	currentlyReadingBooks: any[];

	constructor(
		public dialog: MatDialog,
		public booksService: BooksService,
		public usefulService: UsefulService,
		public valuesService: ValuesService
	) { }

	ngOnInit() {
		this.start();
	}

	/**
	 * Deschiderea dialogului, pasându-i informațiile specifice anumite cărți pentru a fi afișate.
	 * @param book 
	 */
	openDialog(book): void {
		this.usefulService.openDialog({book: book}, MainDialogComponent);
	}

	/**
	 * Obținerea unui set al tuturor categoriilor de cărți din care fac parte 
	 * cărțile primite în urma cererii de tip GET.
	 */
	getGenre() {
		this.genres = Array.from(new Set(this.allBooks.map(book => book.genre)));
	}

	/**
	 * Filtrarea cărților afișate în funcție de titlul cărții.
	 */
	filterByBook() {
		// this.Accordion.openAll();
		this.allBooks = this.allBooksBeforeFiltering;
		this.allBooks = this.allBooks.filter(book => book.book_name.toLowerCase().includes(this.filterBook.toLowerCase()));
	}

	/**
	 * Filtrarea cărților afișate în funcție de numele autorului.
	 */
	filterByAuthor() {
		// this.Accordion.openAll();
		this.allBooks = this.allBooksBeforeFiltering;
		this.allBooks = this.allBooks.filter(book => book.author.toLowerCase().includes(this.filterAuthor.toLowerCase()));
	}

	getCurrentlyReading() {
		let localStorageKeys = Object.keys(localStorage);
		this.currentlyReadingBooks = this.allBooks.filter(book => localStorageKeys.includes(book.id));
		console.log('CURRENTLY READING BOOKS', this.currentlyReadingBooks);
	}

	/**
	 * Obținerea cărților din raftul virtual printr-o cerere de tip GET.
	 * Extragerea categoriilor, obținerea coperții din serviciul S3 pentru fiecare carte,
	 * sortarea în funcție de categorie.
	 */
	start = function() {
		this.booksService.listShelf(this.userId).subscribe(resp => {
			this.allBooks = resp;
			this.getCurrentlyReading();
			this.getGenre();
			this.allBooks.forEach(book => {
				book.stars = Array(+book.stars).fill(1);
				this.booksService.getBookSignedUrl('image', book.image_name).subscribe(resp => {
					book.s3_image_path = resp;
				});
			})
			this.allBooksBeforeFiltering = this.allBooks;
		});
		this.showPage = true;
	}

}
