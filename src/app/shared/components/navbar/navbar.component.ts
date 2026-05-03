import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() userName: string = 'Comandante';
  @Input() title: string = 'Vector JF Control';

  get initials(): string {
    return this.userName.charAt(0).toUpperCase();
  }
}
