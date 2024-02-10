import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'login-comp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    get isValid() { return this.loginForm.valid; }
    constructor(private fb: FormBuilder, private router:Router) {

    }
    ngOnInit() {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        })
    }
    login(){
        console.log('hello??');
        if (this.loginForm.value['password'] === '1234') {
            console.log('hello')
            this.router.navigateByUrl('/home');
        }
    }
}