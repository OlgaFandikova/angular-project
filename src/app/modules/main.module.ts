import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from '../components/app.component';

export { AppComponent };

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, DragulaModule],
  providers: []
})
export class MainModule {}
