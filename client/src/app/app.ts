import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface User {
  id: string;
  displayName: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('dating app');
  protected members = signal<any>([]);

  // Inicializar inyecciones en constructor
  constructor(private http: HttpClient) {}

  // Llamadas en ngOnInit
  // El constructor se considera muy pronto
  ngOnInit() {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: (response) => this.members.set(response),
      error: (error) => console.log(error),
      complete: () => console.log('Completed'),
    });
  }

  // // El subscribe esta bien, pero hay veces que la response puede que no tenga error o pase a completado
  // // En esos casos es mejor usar otro enfoque. En lugar de observables, usar promesas.
  // async ngOnInit() {
  //   this.members.set(await this.getMembers());
  // }

  // async getMembers() {
  //   try {
  //     return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
