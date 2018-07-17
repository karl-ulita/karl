import { Component, OnInit } from '@angular/core';
import { ProductService } from '../common/product.service';
import { Product } from '../common/product.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from 'angularfire2/firestore'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList : Product[];
  constructor(private productService: ProductService, private toastrService: ToastrService, private fs: AngularFirestore) { 
    this.productList = [];
    this.fs.collection('products', ref => {return ref.orderBy('name')}).snapshotChanges().subscribe(querySnapshot => {
      this.productList = querySnapshot.map(doc => {
        var prod: Product = doc.payload.doc.data() as Product;
        prod["$key"] = doc.payload.doc.id;
        return prod;
      })
    });
   }

  ngOnInit() {
  }

  onEdit(product : Product) {
    this.productService.selectedProduct = Object.assign({},product);
    this.productService.addOrEdit = 'Edit ' + this.productService.selectedProduct.name;
  }

  onDelete(product : Product) {
    if (confirm('Are you sure you want to remove this product?')==true){
      this.productService.deleteProduct(product);
      this.toastrService.warning('Product deleted successfully',product.name);
    }
  }

}
