import { HttpClient } from '@angular/common/http';
import { ConfigData } from './config';
import { BaseService } from './base.service';
import { LoadingService } from './loading';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';



export abstract class Service extends BaseService {
    loading = false;
    constructor(public http: HttpClient, public path: String, public loadingService: LoadingService) {
        super();
    }

    getRootUrl() {
        return `${ConfigData.rootUrl}${this.path}`;
    }

    getItemList(filter = null, orderBy = null, order = null, page = null, perPage = null) {
        let query = '';
        const filterData = filter ? filter : '';
        const orderByData = orderBy ? `orderby=${orderBy}` : '';
        const orderData = order ? `order=${order}` : '';

        if (filterData) {
            query += `?${filterData}`;
        }

        if (orderByData) {
            if (query) {
                query += `&${filterData}`;
            } else {
                query += `?${filterData}`;
            }
        }

        if (orderData) {
            if (query) {
                query += `&${order}`;
            } else {
                query += `?${order}`;
            }
        }

        if (page) {
            if (query) {
                query += `&page=${page}`;
            } else {
                query += `?page=${page}`;
            }
        }

        if (perPage) {
            if (query) {
                query += `&per_page=${perPage}`;
            } else {
                query += `?per_page=${perPage}`;
            }
        }

        if (query) {
            query += `&timestepm=${new Date().getTime()}`;
        } else {
            query += `?timestepm=${new Date().getTime()}`;
        }
        const url = `${this.getRootUrl()}${query}`;
        return this.api(url);
    }

    api(url) {
        this.loadingService.present();
        return this.http.get(url).finally(() => {
            this.loadingService.dismiss();
        });
    }

    getItemById(itemId) {
        return this.api(`${this.getRootUrl()}/${itemId}`);
    }
}
