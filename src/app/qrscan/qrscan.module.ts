import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrscanPageRoutingModule } from './qrscan-routing.module';

import { QrscanPage } from './qrscan.page';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrscanPageRoutingModule,
    QRCodeModule
  ],
  declarations: [QrscanPage]
})
export class QrscanPageModule {}
