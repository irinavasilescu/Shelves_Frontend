import { NgModule } from '@angular/core';
import { MatSidenavModule, MatInputModule, MatExpansionModule, MatSnackBarModule, MatProgressBarModule, MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';

const MaterialModules = [
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatListModule,
  ReactiveFormsModule,
  MatStepperModule,
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialModule { }
