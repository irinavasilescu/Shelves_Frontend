import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { ValuesService } from 'src/app/services/values.service';
import { BookModel } from 'src/app/models/Models.model';
import { MainDialogComponent } from 'src/app/dialogs/main-dialog/main-dialog.component';
import { MatDialog } from '@angular/material';
import { UsefulService } from 'src/app/services/useful.service';

@Component({
	selector: 'app-browse-category',
	templateUrl: './browse-category.component.html',
	styleUrls: ['./browse-category.component.css', './../../app.component.css']
})
export class BrowseCategoryComponent implements OnInit {

	books: BookModel[];
	paramsReceived: any;
	booksBeforeFiltering: BookModel[];
	filterBook: string;
	filterAuthor: string;

	constructor(
		private route: ActivatedRoute,
		private booksService: BooksService,
		public valuesService: ValuesService,
		public dialog: MatDialog,
		public usefulService: UsefulService
	) { 
		// Verificarea emiterii unui mesaj al cărui conținut este 'restartBrowseCategory'
		// pentru reîmprospătarea conținutului la comutarea între categorii.
		this.usefulService.getMessage().subscribe(resp => {
			if (resp === 'restartBrowseCategory') {
				this.start();
			}
		});
	}

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
	 * Navigarea la o altă pagină.
	 * @param path
	 */
	navigateTo(path: string) {
		this.usefulService.navigateTo(path);
	}

	/**
	 * Limitarea descrierii din motive estetice.
	 */
	limitDescription() {
		this.books.forEach(book => {
			book.limited_description = book.description.substring(0, 185);
		})
	}

	/**
	 * Filtrarea cărților afișate în funcție de titlul cărții.
	 */
	filterByBook() {
		this.books = this.booksBeforeFiltering;
		this.books = this.books.filter(book => book.book_name.toLowerCase().includes(this.filterBook.toLowerCase()));
	}

	/**
	 * Filtrarea cărților afișate în funcție de numele autorului.
	 */
	filterByAuthor() {
		this.books = this.booksBeforeFiltering;
		this.books = this.books.filter(book => book.author.toLowerCase().includes(this.filterAuthor.toLowerCase()));
	}

	/**
	 * Se stochează parametri furnizați prin rută (categoria).
	 * Se efectuează obținerea cărților printr-o cerere de tip GET.
	 * Se filtrează cărțile primite în funcție de categoria primită în rută.
	 * Au loc obținerea coperții din serviciul S3 pentru fiecare carte,
	 * limitarea descrierilor.
	 */
	start() {
		this.route.params.subscribe(resp => this.paramsReceived = resp);
		this.booksService.listBooks().subscribe(resp => {
			this.books = resp;
			console.log('ALL BOOKS IN CATEGORY', this.books);
			this.books = this.books.filter(book => book.genre === this.paramsReceived.subcategory);
			console.log('BOOKS AFTER FILTER', this.books);
			this.books.forEach(book => {
				this.booksService.getBookSignedUrl('image', book.image_name).subscribe(resp => {
					book.s3_image_path = resp;
				});
			})
			this.limitDescription();
			this.booksBeforeFiltering = this.books;
		});
	}
}
