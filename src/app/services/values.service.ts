import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ValuesService {

	constructor() { }

	ip = 'http://3.127.245.140';
	
	urlStoreUsers 		= this.ip + "/index.php?r=users/signup";
	urlLoginUser  		= this.ip + "/index.php?r=users/login";
	urlCheckLogin		= this.ip + "/index.php?r=users/checklogin";
	urlIndexUser		= this.ip + "/index.php?r=users/index";
	urlLogoutUser		= this.ip + "/index.php?r=users/logout";
	urlListBooks  		= this.ip + "/index.php?r=books/index";
	urlVisitsBooks		= this.ip + "/index.php?r=books/visits";
	ulrMostPopularBooks = this.ip + "/index.php?r=books/indexmostpopular";
	urlAddToShelf		= this.ip + "/index.php?r=books/addtoshelf";
	urlListShelf		= this.ip + "/index.php?r=books/listshelf";
	urlAddNewBook		= this.ip + "/index.php?r=books/newbook";
	urlRemoveFromShelf  = this.ip + "/index.php?r=books/removefromshelf";
	urlBookSignedUrl	= this.ip + "/index.php?r=books/getbooksignedurl";

	genres = [
		'fantasy',
		'classics',
		'horror',
		'fiction',
		'mistery',
		'comics',
		'dystopia'
	]
}
