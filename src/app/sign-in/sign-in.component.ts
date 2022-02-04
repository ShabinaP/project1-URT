import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { HttpclientService } from '../services/httpclient.service';
import { User } from '../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  signedIn: boolean = false;
  users: User[] = [];

  constructor(private httpService: HttpclientService) {}

  ngOnInit(): void {
    // this.getUsers();
  }

  getUsers(): void {
    this.httpService.getAllUsers().subscribe((data) => {
      this.users = data.users;
      console.log(this.users);
    });
  }

  async signIn(userData: { username: string; password: string }) {
    this.username = userData.username;
    try {
      const user = await Auth.signIn(userData.username, userData.password);
      this.signedIn = true;
      console.log(user);
    } catch (error) {
      console.log('error signing in', error);
    }
    console.log(userData);
  }
}
