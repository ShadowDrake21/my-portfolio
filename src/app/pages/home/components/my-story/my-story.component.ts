import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { myStoryContent } from './content/my-story.content';
import { ThemeModeType } from '@shared/models/themeMode.model';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ApplicationState } from '@store/application/application.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.css',
})
export class MyStoryComponent implements OnInit {
  myStoryContent = myStoryContent;

  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
