import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {RestProvider} from './provider/rest';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { FacebookAdsComponent } from './facebook-ads/facebook-ads.component';
import { NgxLoadingModule } from 'ngx-loading';
import { SafepipePipe } from './safepipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FacebookAdsComponent,
    SafepipePipe
  ],
  imports: [

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal,RestProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
