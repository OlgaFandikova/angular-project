import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from '../components/app.component';
import { PanelComponent } from '../components/panel/panel.component';
import { CardComponent } from '../components/card/card.component';
import { LayoutComponent } from '../components/layout/layout.component';

export { AppComponent };

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, LayoutComponent, PanelComponent, CardComponent],
  imports: [BrowserModule, DragulaModule],
  providers: []
})
export class MainModule {}
