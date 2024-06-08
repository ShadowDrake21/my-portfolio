import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StackItemComponent } from './components/stack-item/stack-item.component';
import {
  languageStackContent,
  otherTechnologiesContent,
  technologyStackContent,
} from '@shared/content/stacks.content';
import { ApplicationState } from '@store/application/application.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-stacks',
  standalone: true,
  imports: [CommonModule, StackItemComponent],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.css',
})
export class StacksComponent implements OnInit {
  technologyStackContent = technologyStackContent;
  otherTechnologiesContent = otherTechnologiesContent;
  languageStackContent = languageStackContent;

  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
