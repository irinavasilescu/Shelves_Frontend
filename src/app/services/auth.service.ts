import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		public usersService: UsersService
	) { }

	public isAuthenticated(): Observable<boolean> {
		var subject = new Subject<boolean>();
		this.usersService.checkLogin().subscribe(resp => {
			if (resp.message === true) {
				subject.next(true);
			} else {
				subject.next(false);
			}
		});
		return subject.asObservable();
	}
}
