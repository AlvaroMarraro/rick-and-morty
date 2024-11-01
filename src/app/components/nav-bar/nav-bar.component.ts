import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.form.get('name')?.valueChanges.subscribe(value => {
      this.router.navigate(['/personajes'], { queryParams: { name: value } });
    });
  }

  buscarPersonaje(): void {
    const name = this.form.get('name')?.value?.trim();
    if (!name) {
      alert('Por favor ingrese un nombre para buscar');
      return;
    }
    this.router.navigate(['/personajes'], { queryParams: { name } });
    this.form.reset();
  }
}
