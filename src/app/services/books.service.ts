import { Injectable } from '@angular/core';
import { ValuesService } from './values.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class BooksService {

	constructor(
		public valuesService: ValuesService,
		public http: HttpClient,
		public router: Router
	) { }

	getBook(bookId: number): Observable<any> {
		return this.http.get(this.valuesService.urlListBooks + '&id=' + bookId);
	}

	listBooks(): Observable<any> {
		return this.http.get(this.valuesService.urlListBooks);
	}

	listMostPopularBooks(): Observable<any> {
		return this.http.get(this.valuesService.ulrMostPopularBooks);
	}

	incrementVisits(data): Observable<any> {
		return this.http.post(this.valuesService.urlVisitsBooks, data);
	}

	listShelf(userId): Observable<any> {
		return this.http.get(this.valuesService.urlListShelf + "&id=" + userId);
	}

	addToShelf(userId: number, bookId: number): Observable<any> {
		let req = {
			'id_user': userId,
			'id_book': bookId
		}

		return this.http.post(
			this.valuesService.urlAddToShelf,
			req
		);
	}

	removeFromShelf(userId: number, bookId: number): Observable<any> {
		let req = {
			'id_user': userId,
			'id_book': bookId
		}

		return this.http.post(
			this.valuesService.urlRemoveFromShelf,
			req
		);
	}

	addNewBook(configObject): Observable<any> {
		return this.http.post(
			this.valuesService.urlAddNewBook, 
			configObject
		);
	}

	getBookSignedUrl(type: string, resourceName: string): Observable<any> {
		return type === 'book' ? this.http.get(this.valuesService.urlBookSignedUrl + '&book_name=' + resourceName + '&type=' + type) : this.http.get(this.valuesService.urlBookSignedUrl + '&image_name=' + resourceName + '&type=' + type);
	}
}
