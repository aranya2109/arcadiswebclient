import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'product-form',
    templateUrl: './productform.component.html'
})
export class ProductFormComponent {
    @Input()
    product: any;

    ptitle: string;
    cost: number;
    quantity: number;
    id: number = 0;

    @Output() savep: EventEmitter<any> = new EventEmitter();

    constructor(private modal: NgbModal) {

    }

    ngOnInit() {
        if (this.product) {
            this.ptitle = this.product.Title;
            this.cost = this.product.Cost;
            this.quantity = this.product.Quantity;
            this.id = this.product.Id;
        }
    }

    save() {
        this.product = { id: this.id, Title: this.ptitle, Cost: this.cost, Quantity: this.quantity };
        this.savep.emit(this.product);
        this.modal.dismissAll();
    }

    cancel() {
        this.modal.dismissAll();
    }
}