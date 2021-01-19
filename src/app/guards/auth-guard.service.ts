import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		public authService: AuthService,
		public router: Router
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		var subject = new Subject<boolean>();
		this.authService.isAuthenticated().subscribe(resp => {
			if (resp === true) {
				subject.next(true);
			} else {
				this.router.navigate(['/login']);
				subject.next(false);
			}
		});
		return subject.asObservable();
	}
}