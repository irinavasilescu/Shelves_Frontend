import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './guards/auth-guard.service';
import { ReadComponent } from './pages/read/read.component';
import { BrowseCategoryComponent } from './pages/browse-category/browse-category.component';
import { UploadComponent } from './pages/upload/upload.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyShelfComponent } from './pages/my-shelf/my-shelf.component';

const routes: Routes = [
  { path: '',                               redirectTo: 'welcome', pathMatch: 'full'                    },
  { path: 'welcome',                        component: WelcomeComponent                                 },
  { path: 'login',                          component: LoginComponent                                   },
  { path: 'signup',                         component: SignupComponent                                  },
  // { path: 'main',                           component: MainComponent,           canActivate: [AuthGuard]},
  // { path: 'read/:book',                     component: ReadComponent,           canActivate: [AuthGuard]},
  // { path: 'browse/:category/:subcategory',  component: BrowseCategoryComponent, canActivate: [AuthGuard]},
  // { path: 'upload',                         component: UploadComponent,         canActivate: [AuthGuard]},
  // { path: 'account',                        component: MyAccountComponent,      canActivate: [AuthGuard]},
  // { path: 'myshelf',                        component: MyShelfComponent,        canActivate: [AuthGuard]},
  { path: 'main',                           component: MainComponent           },
  { path: 'read/:book',                     component: ReadComponent           },
  { path: 'browse/:category/:subcategory',  component: BrowseCategoryComponent },
  { path: 'upload',                         component: UploadComponent         },
  { path: 'account',                        component: MyAccountComponent      },
  { path: 'myshelf',                        component: MyShelfComponent        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  WelcomeComponent,
  LoginComponent,
  SignupComponent
]
