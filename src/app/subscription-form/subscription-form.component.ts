import { Component } from '@angular/core';
import { Subscrib } from '../models/subscrib';
import { SubService } from '../services/sub.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent {
  emailErr: boolean = false;
  subSuc: boolean = false;

  constructor(private subsev: SubService) {}
  onSub(data: any) {
    const subData: Subscrib = {
      name: data.value.name,
      email: data.value.email,
    };
    // this.subsev.addData(subData);
    this.subsev.checkSub(subData.email).subscribe((e) => {
      console.log(e);
      if (e.empty) {
        this.subsev.addData(subData);
        this.subSuc = true;
      } else {
        this.emailErr = true;
      }
    });
  }
}
