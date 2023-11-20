import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  sendPasswordResetEmail,
  signInWithRedirect,
} from 'firebase/auth';

import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

interface ErrorResponse {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  private readonly googleProvider = new GoogleAuthProvider();

  constructor() {
    // this.signOut();
  }

  get userState$() {
    return authState(this.auth);
  }

  getCurrentUser(): User| null{
    return this.auth.currentUser
  }

  getUserEmail(): string | null {
    const user = this.getCurrentUser();
    return user ? user.email : null;
  }

  async signInGoogle(): Promise<void> {
    try {
      await signInWithRedirect(this.auth, this.googleProvider);
    } catch (error) {
      console.log('Google login', error);
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      //Create Account
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await this.sendEmailVerification(user);
      //send email
      this.router.navigate(['/user/email-verification']);
      //Redirect to welcome message
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log('Code', code);
      console.log('Message', message);
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      // SignIn
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(user);
      //Check if the user is already verified
      this.checkUserVerified(user);
      //Redirect to user's home page
      // this.router.navigate(['/user/profile']);
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log('Code', code);
      console.log('Message', message);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      await sendEmailVerification(user);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  private checkUserVerified(user: User): void {
    const route = user.emailVerified ? '/home' : '/user/email-verification';
    this.router.navigate([route]);
  }
}
