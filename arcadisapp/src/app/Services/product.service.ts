import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    rootUrl = "http://localhost:60731/";
    constructor(private http: HttpClient) {

    }

    public getAllProducts() {
        return this.http.get(this.rootUrl + "products");
    }

    public addProduct(product: any) {
        return this.http.post(this.rootUrl + "addproduct", product);
    }

    public updateProduct(product: any) {
        return this.http.post(this.rootUrl + "updateproduct", product);
    }
}