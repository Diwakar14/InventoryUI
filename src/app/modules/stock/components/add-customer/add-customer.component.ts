import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SlideIn } from 'src/app/animations/SlideIn';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  animations: [SlideIn],
})
export class AddCustomerComponent {
  customer = new Customer();
  addingCustomer: boolean = false;
  constructor(
    public customerService: CustomerService,
    private dialogRef: MatDialogRef<AddCustomerComponent>
  ) {}

  addCustomer(form: NgForm) {
    if (form.valid) {
      this.addingCustomer = true;
      this.customerService.create(this.customer).subscribe({
        next: (value: any) => {
          this.addingCustomer = false;
          console.log(value);
          this.dialogRef.close(value);
        },
        error: (err) => {
          console.log(err);
          this.addingCustomer = false;
        },
      });
    }
  }
}
