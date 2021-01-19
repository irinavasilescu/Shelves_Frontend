import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ServicesModule } from './services/services.module';
import { MainComponent } from './pages/main/main.component';
import { MainDialogComponent } from './dialogs/main-dialog/main-dialog.component';
import { ReadComponent } from './pages/read/read.component';
import { BrowseCategoryComponent } from './pages/browse-category/browse-category.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UploadComponent } from './pages/upload/upload.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyShelfComponent } from './pages/my-shelf/my-shelf.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    MainComponent,
    MainDialogComponent,
    ReadComponent,
    BrowseCategoryComponent,
    NavigationComponent,
    UploadComponent,
    MyAccountComponent,
    MyShelfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServicesModule
  ],
  entryComponents: [
    MainDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
