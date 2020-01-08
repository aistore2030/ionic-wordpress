import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { LoadingService } from './loading';

@Injectable({ providedIn: 'root' })
export class MediaService extends Service {
  constructor(public http: HttpClient, public loader: LoadingService) {
    super(http, 'media', loader);
  }
}
