import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth-guard.service';
import { NotificationsService } from './notifications.service';
import { BooksService } from './books.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [
        UsersService,
        AuthGuard,
        BooksService,
        NotificationsService
    ]
})

export class ServicesModule {}