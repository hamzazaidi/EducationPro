import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterActions, ConfigActions } from '../../store/actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  form: FormGroup
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [
        '',
        { 
          updateOn: 'blur' ,
          validators: [ Validators.required ]
        }
      ],
    })   
    this.store.dispatch(ConfigActions.SetArea())
  }

  ngOnInit() {
   
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    const { name } = this.form.getRawValue();
    this.store.dispatch(ConfigActions.SetUser({ payload: name }))
    this.store.dispatch(RouterActions.Go({ payload: { path: ['/quiz'] } }))
  }

  onAuthenticate() {
    this.store.dispatch(ConfigActions.AuthenticateUser())
  }

}