import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      MatDialogModule,
      MatMenuModule
  ],
})
export class MaterialModule { }
