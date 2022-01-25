import { NgModule } from '@angular/core';
import { HeaderComponent } from './components';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
