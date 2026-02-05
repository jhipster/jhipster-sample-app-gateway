import { Component, Injector, OnInit, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileService } from './profile.service';

@Component({
  selector: 'jhi-page-ribbon',
  template: `
    @if (ribbonEnvSignal?.(); as ribbonEnv) {
      <div class="ribbon">
        <a href="">{{ { dev: 'Development' }[ribbonEnv ?? ''] }}</a>
      </div>
    }
  `,
  styleUrl: './page-ribbon.scss',
})
export default class PageRibbon implements OnInit {
  ribbonEnvSignal?: Signal<string | undefined>;
  private readonly injector = inject(Injector);
  private readonly profileService = inject(ProfileService);

  ngOnInit(): void {
    const ribbonEnv$: Observable<string | undefined> = this.profileService.getProfileInfo().pipe(map(profileInfo => profileInfo.ribbonEnv));
    this.ribbonEnvSignal = toSignal(ribbonEnv$, { injector: this.injector });
  }
}
