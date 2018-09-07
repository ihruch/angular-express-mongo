import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderAst } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  formErrors = {
    emailInput: '',
    passInput: ''
  };

  MessageErrors = {
    emailInput: {
      required: 'Это поле является обязательным',
      pattern: 'Введенный email адрес неправильного формата'
    },
    passInput: {
      required: 'Это поле является обязательным',
      maxlength: 'Максимальная длинна пароля 10 символов'
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.regForm = this.fb.group({
      emailInput: [
        '',
        [Validators.required, Validators.pattern(this.emailPattern)]
      ],
      passInput: ['', [Validators.required, Validators.maxLength(10)]]
    });

    this.regForm.valueChanges.subscribe(data => {
      this.changesValueField();
      // console.log(x);
      console.log('valid ', this.regForm.valid);
      console.log('pristin', this.regForm.pristine);
      console.log('untouched', this.regForm.untouched);
    });
  }

  changesValueField() {
    for (const item in this.formErrors) {
      this.formErrors[item] = '';
      const control = this.regForm.get(item);

      if (control && control.dirty && !control.valid) {
        const message = this.MessageErrors[item];
        for (const key in control.errors) {
          console.log('control.error', control.errors);
          this.formErrors[item] += message[key] + ' ';
        }
      }
    }
  }

  sendData() {
    console.log(this.regForm.value);
    const user = this.regForm.value;

    this.authService.registreUser(user).subscribe(
      result => {
        console.log(result);
        localStorage.setItem('token', result['token']);
        this.router.navigate(['/special']);
      },
      error => console.log(error)
    );
  }
  resetForm() {
    this.regForm.reset();
  }
}
