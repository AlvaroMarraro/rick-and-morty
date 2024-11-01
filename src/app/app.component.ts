import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rick-and-morty';

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.getElementById('backToTop');
    if (button) {
      if (window.pageYOffset > 100) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    }
  }
}
