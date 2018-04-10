import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from '../components/app.component';
import { PanelComponent } from '../components/panel/panel.component';

export { AppComponent };

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, PanelComponent],
  imports: [BrowserModule, DragulaModule],
  providers: []
})
export class MainModule {}
