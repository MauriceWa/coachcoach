import { Component, signal, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('coachcoach');
  protected isMenuOpen = signal(false);

  @ViewChild('serviceSlider') serviceSlider!: ElementRef<HTMLDivElement>;

  protected leftFadeOpacity = signal(0);
  protected rightFadeOpacity = signal(1);

  ngAfterViewInit() {
    this.updateFadeOpacities();
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  onSliderScroll() {
    this.updateFadeOpacities();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateFadeOpacities();
  }

  private updateFadeOpacities() {
    if (!this.serviceSlider) return;

    const el = this.serviceSlider.nativeElement;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    // Fade in the left shadow as we scroll away from the start
    // Fully visible after 50px of scroll
    const leftOpacity = Math.min(scrollLeft / 50, 1);
    this.leftFadeOpacity.set(leftOpacity);

    // Fade out the right shadow as we reach the end
    const rightOpacity = Math.min((maxScroll - scrollLeft) / 50, 1);
    this.rightFadeOpacity.set(rightOpacity);
  }
}
