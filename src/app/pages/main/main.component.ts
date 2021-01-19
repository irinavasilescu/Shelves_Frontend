import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BooksService } from 'src/app/services/books.service';
import { BooksSortedModel } from 'src/app/models/Models.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MainDialogComponent } from 'src/app/dialogs/main-dialog/main-dialog.component';
import { ValuesService } from 'src/app/services/values.service';
import { Router } from '@angular/router';
import { UsefulService } from 'src/app/services/useful.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./../../app.component.css', './main.component.css']
})
export class MainComponent implements OnInit {
	showPage = false;
	pdf: any;
	page: number;
	allBooks: any[];
	allBooksBeforeFiltering: any[];
	genres: any;
	allBooksSorted: BooksSortedModel;
	filterBook: string;
	filterAuthor: string;
	otherBooks: any[];
	isLinear = false;
  	firstFormGroup: FormGroup;
  	secondFormGroup: FormGroup;

	constructor(
		public sanitizer: DomSanitizer,
		public booksService: BooksService,
		public dialog: MatDialog,
		public valuesService: ValuesService,
		public router: Router,
		public usefulService: UsefulService,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required]
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required]
		});

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
	 * Sortarea cărților într-un obiect, în funcție de categoriile în care se regăsesc.
	 */
	sortByGenre() {
		this.allBooksSorted = this.usefulService.emptyCategoriesObject(this.genres);
		this.allBooks.forEach(book => {
			this.genres.forEach(genre => {
				if (book.genre === genre) this.allBooksSorted[genre].push(book); 
			})
		})
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
		this.allBooks.forEach(book => {
			book.limited_description = book.description.substring(0, 185);
		})
	}

	/**
	 * Filtrarea cărților afișate în funcție de titlul cărții.
	 */
	filterByBook() {
		this.allBooks = this.allBooksBeforeFiltering;
		this.allBooks = this.allBooks.filter(book => book.book_name.toLowerCase().includes(this.filterBook.toLowerCase()));
		this.sortByGenre();
	}

	/**
	 * Filtrarea cărților afișate în funcție de numele autorului.
	 */
	filterByAuthor() {
		this.allBooks = this.allBooksBeforeFiltering;
		this.allBooks = this.allBooks.filter(book => book.author.toLowerCase().includes(this.filterAuthor.toLowerCase()));
		this.sortByGenre();
	}

	/**
	 * Verificare necesară pentru afișarea fiecărei cărți în blocul corespunzător 
	 * respectivei categorii la listarea celor mai populare cărți ale aplicației.
	 * @param genre 
	 */
	showGenreInList(genre) {
		return this.allBooks.map(book => book.genre).includes(genre);
	}

	/**
	 * Obținerea cărților printr-o cerere de tip GET.
	 * Extragerea categoriilor, obținerea coperții din serviciul S3 pentru fiecare carte,
	 * limitarea descrierilor, sortarea în funcție de categorie.
	 */
	start = function() {
		this.booksService.listMostPopularBooks().subscribe(resp => {
			this.allBooks = resp.slice(0, 6);
			this.booksService.listBooks().subscribe(resp => {
				this.otherBooks = resp.slice(0, 6);
				this.otherBooks.forEach(book => {
					book.stars = Array(+book.stars).fill(1);
					this.booksService.getBookSignedUrl('image', book.image_name).subscribe(resp => {
						book.s3_image_path = resp;
					});
				})
			})
			this.getGenre();
			this.allBooks.forEach(book => {
				book.stars = Array(+book.stars).fill(1);
				this.booksService.getBookSignedUrl('image', book.image_name).subscribe(resp => {
					book.s3_image_path = resp;
				});
			})
			this.limitDescription();
			this.sortByGenre();
			this.allBooksBeforeFiltering = this.allBooks;
			this.showPage = true;
		});
	}
}
