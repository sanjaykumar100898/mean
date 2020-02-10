import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Sensor-create',
  templateUrl: './Sensor-create.component.html',
  styleUrls: ['./Sensor-create.component.css']
})

export class SensorCreateComponent implements OnInit {
  submitted = false;
  SensorForm: FormGroup;
  SensorProfile:any = ['cfs', 'kelvin', 'Pa', 'Degree-Celsius']

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.SensorForm = this.fb.group({
      Sensor_name: ['', [Validators.required]],
      Sensor_id: ['', [Validators.required]],
      Sensor_unit: ['', [Validators.required]],
      Sensor_value: ['', [Validators.required]],
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.SensorForm.get('Sensor_unit').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.SensorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.SensorForm.valid) {
      return false;
    } else {
      this.apiService.createSensor(this.SensorForm.value).subscribe(
        (res) => {
          console.log('successfully added!')
          this.ngZone.run(() => this.router.navigateByUrl('/Sensor-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
