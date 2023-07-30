import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { StockService } from 'src/app/services/stock.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { SlideInLeft } from 'src/app/animations/SlideInLeft';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  animations: [SlideInLeft],
})
export class CreateOrderComponent implements OnInit {
  products: any[] = [];
  selectedProducts: any[] = [];
  isAddCustomer: boolean = false;
  paymentModeControl = new FormControl();
  paymentOptios: string[] = ['Online', 'Cash', 'Check', 'Both'];
  creatingOrder: boolean = false;
  customer: Customer = new Customer();
  payment = {
    paymentMode: '',
    partialPayment: false,
    onlineAmount: 0,
    cashAmount: 0,
    dueAmount: 0,
  };

  orderProcess = {
    product: {
      item: [],
      active: true,
      complete: false,
    },
    customer: {
      data: {},
      active: false,
      complete: false,
    },
    payment: {
      data: {},
      active: false,
      complete: false,
    },
  };

  constructor(
    public productService: StockService,
    public customerService: CustomerService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddCustomerComponent>
  ) {}

  get getTotal() {
    return this.selectedProducts.reduce((a, b) => a + b.qty * b.salePrice, 0);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (value: any) => {
        this.products = value.data.map((i: any) => ({
          id: i.id,
          name: i.name,
          salePrice: i.salePrice,
        }));
      },
      error: (err) => {},
    });
  }

  handleProductSelected(product: any) {
    this.selectedProducts.push({ ...product, qty: 1 });
    this.orderProcess.product.complete = true;
  }

  handleCustomerSelect(customer: Customer) {
    this.customer = customer;
    this.orderProcess.customer.complete = true;
  }

  addCustomerForm() {
    this.dialog
      .open(AddCustomerComponent, {
        width: '400px',
        id: 'add-customer',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            this.customer = value.data;
          }
        },
      });
  }

  handlePaymentChange() {
    this.payment.paymentMode = this.paymentModeControl.value;
    this.orderProcess.payment.complete = true;
  }

  next(nextBlock: string) {
    if (nextBlock == 'customer') {
      this.orderProcess.customer.active = true;
      this.orderProcess.product.active = false;
      this.orderProcess.product.complete = true;
    } else if (nextBlock == 'payment') {
      this.orderProcess.customer.active = false;
      this.orderProcess.payment.active = true;
      this.orderProcess.customer.complete = true;
    }
  }

  back(prevBlock: string) {
    if (prevBlock == 'product') {
      this.orderProcess.product.active = true;
      this.orderProcess.product.complete = true;
      this.orderProcess.customer.active = false;
    } else if (prevBlock == 'customer') {
      this.orderProcess.customer.active = true;
      this.orderProcess.payment.active = false;
    }
  }

  displaySelect(value: any): any {
    return value?.name;
  }

  createOrder() {
    let order = {
      totalAmount: this.getTotal,
      paymentMode: this.payment.paymentMode,
      isPartialPayment: this.payment.partialPayment,
      currency: '₹',
      onlineAmount: this.payment.onlineAmount,
      cashAmount: this.payment.cashAmount,
      dueAmount: this.payment.dueAmount,
      orderType: 'Customer',
      customerId: this.customer.id,
      products: this.selectedProducts.map((p) => ({
        productId: p.id,
        quantity: p.qty,
      })),
    };
    console.log(order);

    this.creatingOrder = true;
    this.orderService.createOrders(order).subscribe({
      next: (value: any) => {
        if (value.status == 200) {
          this.creatingOrder = false;
          this.dialogRef.close(value);
        }
      },
      error: (err) => {
        console.log(err);
        this.creatingOrder = false;
      },
    });
  }
}
