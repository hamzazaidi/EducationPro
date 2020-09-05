import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROOT_REDUCER } from './store/reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { QuizComponent } from './containers/quiz/quiz.component';
import { guards } from './guards';
import { ResultsComponent } from './containers/results/results.component';
import { services } from './services';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AdministratorComponent } from './containers/administrator/administrator.component';
import { ConfigurationComponent } from './containers/configuration/configuration.component';
import { CategoryComponent } from './components/category/category.component';

const firebaseConfig = {
  apiKey: 'AIzaSyDqzcZ6yLDINgpEa2Sfw1plEDuVcbjdv7Q',
  authDomain: 'quiz-8ab36.firebaseapp.com',
  databaseURL: 'https://quiz-8ab36.firebaseio.com',
  projectId: 'quiz-8ab36',
  storageBucket: 'quiz-8ab36.appspot.com',
  messagingSenderId: '793942175810',
  appId: '1:793942175810:web:3ccb4a461e8499b4a77ddb',
  measurementId: 'G-Z5Z1K0P9C6'
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCER),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent,
    ResultsComponent,
    AdministratorComponent,
    ConfigurationComponent,
    CategoryComponent
  ],
  providers: [
    ...guards,
    ...services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
