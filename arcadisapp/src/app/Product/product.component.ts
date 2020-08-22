import { Component } from "@angular/core";
import { ProductService } from "../Services/product.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from "../ProductForm/productform.component";
import { Module, ClientSideRowModelModule, MenuModule, ExcelExportModule, ClipboardModule } from '@ag-grid-enterprise/all-modules';

@Component({
    selector: 'product',
    templateUrl: './product.component.html'
})
export class ProductComponent {
    columnDefs = [
        { field: 'action', headerName: 'Action', cellRenderer: this.actionButtons.bind(this) },
        { field: 'Title', headerName: 'Title' },
        { field: 'Cost', headerName: 'Cost' },
        { field: 'Quantity', headerName: 'Quantity' },
        { field: 'TotalCost', headerName: 'Total Cost' },
        { field: 'Id', headerName: 'Id', hide: true }
    ];
    rowData = [];
    gridApi: any;
    gridColumnApi: any;
    public modules: Module[] = [
        ClientSideRowModelModule,
        MenuModule,
        ExcelExportModule,
        ClipboardModule,
    ];

    srchTxt: string;

    constructor(private ps: ProductService, private modal: NgbModal) { }

    ngOnInit() {
        this.loadGrid();
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    loadGrid() {
        this.ps.getAllProducts().subscribe(data => {
            this.rowData = data['Response'];
            setTimeout(() => this.gridColumnApi.autoSizeAllColumns);
        });
    }

    actionButtons() {
        const edit = '<span data-action="edit"><button style="height:25px; font-size:0.452rem;" class="btn-sm btn-primary">Edit</button></span>&nbsp;<br/>';
        return edit;
    }

    openProductEditModal(action = 'add', data = null) {
        const ref = this.modal.open(ProductFormComponent, { backdrop: 'static', size: 'lg', centered: true });
        if (data) {
            ref.componentInstance.product = data;
        }
        ref.componentInstance.savep.subscribe(data => {
            if (action === 'add') {
                this.ps.addProduct(data).subscribe(d => {
                    this.loadGrid();
                });
            }
            else {
                this.ps.updateProduct(data).subscribe(d => {
                    this.loadGrid();
                });
            }
        });
    }

    addProduct() {
        this.openProductEditModal();
    }

    updateProduct(data) {
        this.openProductEditModal('update', data);
    }

    rowClicked(e) {
        if (e.event.toElement.tagName.toLowerCase() === 'button') {
            this.updateProduct(e.data);
        }
    }

    exportAsExcel() {
        this.gridApi.exportDataAsExcel();
    }
}