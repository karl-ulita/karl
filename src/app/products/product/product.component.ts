import { Component, OnInit} from '@angular/core';
import { ProductService } from '../common/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  productExists: boolean;

  constructor(private productService: ProductService, private toastrService: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      $key: null,
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*[.]{0,1}[0-9]{0,2}$')]],
      amount: [null, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });
    this.resetForm();
  }

  get $key(){
    return this.productForm.get('$key')
  }

  get name(){
    return this.productForm.get('name')
  }

  get price(){
    return this.productForm.get('price')
  }

  get amount(){
    return this.productForm.get('amount')
  }

  onSubmit(productForm : FormGroup) {
    if(productForm.value.$key==null){
      this.productService.prodList.ref.where("name", "==", productForm.value.name).get().then(doc => { 
        if (doc.docs.length > 0) {
        this.toastrService.warning('Product insert failed. Product already exists',productForm.value.name)
        }
        else{
          this.productService.insertProduct(productForm.value);
          this.toastrService.success('Product inserted successfully',productForm.value.name);
          this.resetForm();
        } 
      });
    }
    else{
      this.productService.updateProduct(productForm.value)
      this.toastrService.success('Product updated successfully',productForm.value.name);
      
    this.resetForm();
    }
  }

  resetForm() {
    this.productService.addOrEdit = 'Add Product';
    this.productForm.reset();
    this.productService.selectedProduct = {
      $key : null,
      name : '',
      price : null,
      amount : null
    }
  }

}