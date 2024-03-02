import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ComponentsModule } from '../shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';


@NgModule({
  providers: [UntypedFormBuilder],
  declarations: [
    SignupComponent,
  ],
  imports: [
    NzButtonModule,
    ReactiveFormsModule,
    ComponentsModule,
    CommonModule,
    AuthenticationRoutingModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzRadioModule
  ]
})
export class AuthenticationModule { }
