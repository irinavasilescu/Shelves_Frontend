import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { BookModel } from 'src/app/models/Models.model';
import * as S3 from 'aws-sdk/clients/s3';
import { ValuesService } from 'src/app/services/values.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UsefulService } from 'src/app/services/useful.service';

/**
 * Codurile tastelor săgeată stânga și săgeată dreapta
 */
export enum KEY_CODE {
	RIGHT_ARROW = 39,
	LEFT_ARROW = 37
}

@Component({
	selector: 'app-read',
	templateUrl: './read.component.html',
	styleUrls: ['./read.component.css', './../../app.component.css']
})
export class ReadComponent implements OnInit {

	pageLeft: number = 1;
	pageRight: number = 2;
	bookId: number;
	book: any;
	pdf: string;
	totalPages: any;
	progress: any;
	pageToGoTo: any;
	pdfLoaded: boolean = false;
	
	constructor(
		private route: ActivatedRoute,
		private booksService: BooksService,
		public valuesService: ValuesService,
		public snackBar: MatSnackBar,
		public usefulService: UsefulService
	) { }

	/**
	 * Urmărirea apăsării pe săgeată dreapta sau săgeată stânga pentru 
	 * navigarea conținutului fișierului pdf.
	 * @param event 
	 */
	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		if (event.keyCode === KEY_CODE.RIGHT_ARROW) { this.nextPages();	}
	  	if (event.keyCode === KEY_CODE.LEFT_ARROW)  { this.prevPages(); }
	}

	ngOnInit() {
		this.start();
	}

	/**
	 * Se stochează parametri furnizați prin rută (id-ul cărții).
	 * Afișarea conținutului începând de la pagina setată ca semn de carte.
	 * Dacă nu este setat un semn de carte, sa va afișa conținutul de la început.
	 * Obținerea informațiilor cărții din baza de date și obținerea fișierului din serviciul S3.
	 * Incrementarea vizitelor cărții.
	 */
	start() {
		this.route.params.subscribe(resp => this.bookId = resp.book);
		this.startFromBookmark();
		this.booksService.getBook(this.bookId).subscribe(resp => {
			this.book = resp[0];
			let params = {
				Bucket: 'licentas3',
				Key: this.book.s3_folder + "/" + this.book.file_name
			}
			this.booksService.getBookSignedUrl('book', this.book.file_name).subscribe(resp => {
				this.pdf = resp;
				this.booksService.incrementVisits({id: this.book.id}).subscribe(
					succes => console.log("Visits incremented! " + this.book.id),
					error => console.error(error)
				);
			})
		});	
	}

	/**
	 * Verificarea existenței unui semn de carte setat și afișarea conținutului
	 * începând cu pagina salvată în memoria locală a browserului.
	 */
	startFromBookmark() {
		if (localStorage.getItem(this.bookId.toString())) {
			this.pageLeft = +localStorage.getItem(this.bookId.toString());
			this.pageRight = +localStorage.getItem(this.bookId.toString()) + 1;
			this.usefulService.openSnackBar("Welcome back to your read! This is where you left off.", 'message');
		}
	}

	/**
	 * Incrementarea valorilor paginilor curente în cazul navigării la paginile următoare.
	 */
	nextPages() {
		this.pageLeft += 2;
		this.pageRight += 2;
		this.progress = (this.pageLeft/this.totalPages) * 100;
	}

	/**
	 * Decrementarea valorilor paginilor curente în cazul navigării la paginile anterioare.
	 */
	prevPages() {
		if (this.pageLeft <= 1 || this.pageRight <= 2) return;
		this.pageLeft -= 2;
		this.pageRight -= 2;
		this.progress = (this.pageLeft/this.totalPages) * 100;
	}

	/**
	 * Obținerea numărului total de pagini ale fișierului.
	 * @param pdfData 
	 */
	afterLoadComplete(pdfData: any) {
		this.totalPages = pdfData.numPages;
		console.log('TOTAL NUMBER OF PAGES', this.totalPages);
	}

	/**
	 * Verificarea parității unei pagini.
	 * @param page 
	 */
	isEven(page) {
		return (+page) % 2 === 0;
	}

	/**
	 * Verificarea imparității unei pagini.
	 * @param page 
	 */
	isOdd(page) {
		return (+page) % 2 === 1;
	}

	/**
	 * Setarea valorilor paginilor curente în funcție de pagina pe care
	 * utilizatorul dorește să o vizualizeze.
	 */
	goToPage() {
		if (this.isEven(+this.pageToGoTo)) {
			this.pageRight = +this.pageToGoTo;
			this.pageLeft = +this.pageToGoTo - 1;
		}
		if (this.isOdd(+this.pageToGoTo)) {
			this.pageLeft = +this.pageToGoTo;
			this.pageRight = +this.pageToGoTo + 1;
		}
	}

	/**
	 * Setarea unui semn de carte în memoria locală a browserului.
	 */
	setBookmark() {
		localStorage.setItem(this.bookId.toString(), this.pageLeft.toString());
		if (localStorage.getItem(this.bookId.toString())) {
			this.usefulService.openSnackBar("Bookmark set successfully! You'll return to where you left off.", 'succes');
		} else {
			this.usefulService.openSnackBar("There has been an error with your request. Please try again later.", 'error');
		}
	}

	/**
	 * Verificarea încărcării fișierului pdf.
	 */
	pdfLoad() {
		this.pdfLoaded = true;
	}
}
