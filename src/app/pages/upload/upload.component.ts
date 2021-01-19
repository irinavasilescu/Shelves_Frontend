import { Component, OnInit, HostListener } from '@angular/core';
import { ValuesService } from 'src/app/services/values.service';
import { FilesModel } from 'src/app/models/Models.model';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { BooksService } from 'src/app/services/books.service';
import { UsefulService } from 'src/app/services/useful.service';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css', './../../app.component.css']
})
export class UploadComponent implements OnInit {

	bookName: string;
	authorName: string;
	fileName: string;
	imageName: string;
	genre: string;
	description: string;
	allGenres: string[] = this.valuesService.genres;
	fileOver: boolean;
	files: any = [];

	constructor(
		public valuesService: ValuesService,
		public snackBar: MatSnackBar,
		public booksService: BooksService,
		public usefulService: UsefulService
	) { }

	ngOnInit() { }

	/**
	 * Completarea automată a numelui fișierului și a imaginii ce vor fi încărcate
	 * în funcție de titlul cărții furnizat de utilizator
	 */
	autoCompleteFileAndImageName() {
		if (this.bookName) {
			this.fileName = this.bookName.toLowerCase().replace(/ /g, '_').replace(/'/g, '') + '.pdf';
			this.imageName = this.bookName.toLowerCase().replace(/ /g, '_').replace(/'/g, '') + '.jpg';
		}
	}

	/**
	 * Se ocupă de stocarea fișierelor încărcate prin navigarea în
	 * sistemul de fișiere al utilizatorului.
	 * @param event 
	 */
	fileBrowseHandler(event) {
		event.preventDefault();
		this.files.push(...event.target.files);
		console.log('FILES', this.files);
	}

	/**
	 * Setează variabila fileOver cu valoarea true atunci când 
	 * se efectuează tragerea fișierului în fereastra aplicației.
	 * Variabila este necesară pentru aplicarea condiționată a unei clase CSS.
	 * @param event 
	 */
	@HostListener('dragover', ['$event']) 
	onDragOver(event) {
		event.preventDefault();
		event.stopPropagation();
		this.fileOver = true;
	}

	/**
	 * Setează variabila fileOver cu valoare false atunci când
	 * se efectuează părăsirea ferestrei aplicației în timp ce 
	 * fișierul nu a fost încă eliberat.
	 * Variabila este necesară pentru dezactivarea condiționată a unei clase CSS.
	 * @param event 
	 */
	@HostListener('dragleave', ['$event']) 
	onDragLeave(event) {
		event.preventDefault();
		event.stopPropagation();
		this.fileOver = false;
	}

	/**
	 * Se ocupă de stocarea fișierelor încărcate prin eliberarea
	 * acestora în fereastra aplicației.
	 * @param event 
	 */
	@HostListener('drop', ['$event']) 
	onDrop(event) {
		event.preventDefault();
		event.stopPropagation();
		this.fileOver = false;
		this.files.push(...event.dataTransfer.files);
		console.log('FILES', this.files);
	}

	/**
	 * Eliminarea unui fișier din lista fișierelor ce urmează
	 * a fi încărcate în serviciul S3.
	 * @param file 
	 */
	removeFile(file) {
		let index = this.files.findIndex(item => item.name === file.name);
		this.files.splice(index, 1);
		console.log('FILES', this.files);
	}

	/**
	 * Adăugarea informațiilor cărții în baza de date.
	 * Se verifică faptul că utilizatorul a introdus date în toate câmpurile formularului.
	 * Se efectuează o cerere de tip POST pentru stocarea informațiilor furnizate.
	 */
	addNewBook() {
		if (this.bookName !== '' && this.authorName !== '' && this.fileName !== '' && this.imageName !== '' && this.genre !== '' && this.description !== '') {
			let params = {
				book_name: this.bookName,
				author: this.authorName,
				file_name: this.fileName,
				image_name: this.imageName,
				s3_folder: 'fiction_books',
				genre: this.genre,
				description: this.description
			}
	
			this.booksService.addNewBook(params).subscribe(
				succes => {
					this.usefulService.openSnackBar('Your book was successfully uploaded to SHELVES.', 'succes');
				},
				error => {
					console.error('ADD NEW BOOK', error);
					this.usefulService.openSnackBar('There has been an error with your request. Please try again later.', 'error');
					return;
				}
			);
		}
	}

	/**
	 * Se efectuează Încărcarea fiecărui fișier în serviciul S3.
	 * Sunt setați parametri necesari: nume bucket, nume fișier.
	 * Este apelată metoda upload furnizată de SDK-ul Amazon Web Services.
	 */
	uploadFiles() {
		let that = this;
		this.files.forEach(file => {
			let params = {
				Bucket: 'licentas3',
				Key: file.type === 'application/pdf' ? 'fiction_books/' + this.fileName : 'images_books/' + this.imageName,
				Body: file,
				ContentType: file.type,
			}
	
			// this.valuesService.s3.upload(params, function (err, data) {
			// 	if (err) {
			// 		console.error('UPLOAD FILES', err);
			// 		that.usefulService.openSnackBar('There has been an error with cloud communication. Please try again later.', 'error');
			// 		return;
			// 	}
			// });
		})	
	}

	/**
	 * Efectuează validări ale datelor introduse de utilizator.
	 * În cazul în care datele sunt valide, se poate realiza
	 * încărcarea datelor în baza de date și a fișierelor în S3.
	 */
	submit() {
		if (!this.bookName || !this.authorName || !this.genre) {
			console.log('book, author, genre', this.bookName + ' ' + this.authorName + ' ' + this.genre);
			this.usefulService.openSnackBar("All fields are required! Make sure you filled every field.", 'error'); return;
		}
		if (this.files.length > 2) {
			this.usefulService.openSnackBar('You have more than 2 files! Take another look at your files.', 'error'); return;
		}
		if (this.files.map(file => file.type).filter(item => item === 'application/pdf').length > 1) {
			this.usefulService.openSnackBar('You cannot upload more than one book at a time!', 'error'); return;
		}
		if (this.files.map(file => file.type).filter(item => item === 'application/pdf').length === 0) {
			this.usefulService.openSnackBar("You didn't upload any book! Take another look at your files.", 'error'); return;
		}
		if (this.files.map(file => file.type).filter(item => item === 'image/jpeg').length > 1) {
			this.usefulService.openSnackBar('You cannot upload more than one image at a time!', 'error'); return;
		}
		if (this.files.map(file => file.type).filter(item => item === 'image/jpeg').length === 0) {
			this.usefulService.openSnackBar("You didn't upload any image! Take another look at your files.", 'error'); return;
		}

		this.uploadFiles();
		this.addNewBook();
	}
}
