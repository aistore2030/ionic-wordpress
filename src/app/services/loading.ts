import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;
  pendingRequests = 0;
  loader: any;

  constructor(public loadingController: LoadingController) {
    this.create();
  }

  create() {
    this.loader = this.loadingController.create({
      duration: 12000,
    });
  }

  async present() {
    return await this.loader.then(a => {
      if (this.pendingRequests === 0) {
        a.present().then(() => {
          this.isLoading = true;
        });
      }
      this.pendingRequests += 1;
    });
  }

  async dismiss() {
    return await this.loader.then(a => {
      if (this.pendingRequests > 0) {
        this.pendingRequests -= 1;
      }
      if (this.pendingRequests === 0) {
        a.dismiss().then(() => {
        });
        this.create();
      }
    });
  }
}
