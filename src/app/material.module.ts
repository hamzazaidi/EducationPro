import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

const components: any[] = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatRadioModule,
  MatMenuModule,
  MatExpansionModule
];

@NgModule({
  imports: [CommonModule, ...components],
  exports: [...components]
})
export class MaterialModule { }
