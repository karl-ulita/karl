import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  addOrEdit: string = 'Add Product';
  selectedProduct: Product = new Product();
  prodList: AngularFirestoreCollection<any>;

  constructor(private fs: AngularFirestore) {
    this.prodList = this.fs.collection('products', ref => {return ref.orderBy('name')});
  }

  insertProduct(product : Product){
    this.prodList.add({
      name: product.name,
      amount: Number(product.amount),
      price: Number(product.price)
    });
  }
 
  updateProduct(product : Product){
    this.prodList.doc(product.$key).update({
      name: product.name,
      amount: Number(product.amount),
      price: Number(product.price)
    });

  }

  deleteProduct(product : Product){
    this.prodList.doc(product.$key).delete();
  }

}
