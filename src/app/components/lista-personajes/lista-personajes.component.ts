import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonajeService } from '../../services/personaje.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajesComponent implements OnInit {

  personajes: any[] = [];
  paginaActual = 1;
  paginasTotales = 0;
  paginas: (number | string)[] = [];
  form: FormGroup;

  constructor(private personajeService: PersonajeService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['']
    });
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const name = params['name'] || '';
      this.cargarPersonaje(1, name);
      this.form.patchValue({ name });
    });
    this.cargarPersonaje();
    this.form.get('name')?.valueChanges.subscribe(value => {
      this.cargarPersonaje(1, value);
    });
  }

  cargarPersonaje(page: number = this.paginaActual, name: string = '') {
    this.personajeService.obtenerPersonaje(page, name).subscribe(response => {
      this.personajes = response.results;
      this.paginasTotales = response.info.pages;
      this.paginaActual = page;
      this.generarPaginas();
    });
  }
  generarPaginas() {
    const maxPaginas = 5;
    this.paginas = [];

    if (this.paginasTotales <= maxPaginas) {
      this.paginas = Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
    } else {
      const startPage = Math.max(1, this.paginaActual - 2);
      const endPage = Math.min(this.paginasTotales, startPage + maxPaginas - 1);
      for (let i = startPage; i <= endPage; i++) {
        this.paginas.push(i);
      }
      if (startPage > 1) {
        this.paginas.unshift('...');
      }
      if (endPage < this.paginasTotales) {
        this.paginas.push('...');
      }
    }
  }

  irAPagina(pagina: number | string) {
    if (typeof pagina === 'number') {
      this.cargarPersonaje(pagina, this.form.get('name')?.value);
    }
  }


  proximaPagina() {
    if (this.paginaActual < this.paginasTotales) {
      this.cargarPersonaje(this.paginaActual + 1);
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.cargarPersonaje(this.paginaActual - 1);
    }
  }

}
