import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Board } from '@shared/models';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAnchor, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-board-list-top-action-bar',
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAnchor,
  ],
  templateUrl: './board-list-top-action-bar.html',
  styleUrl: './board-list-top-action-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListTopActionBar {
  boards = input<Array<Board>>([]);

  showFavorites = signal(false);
  isFocused = signal(false);
  searchBoard = new FormControl('');

  createBoard = output<void>();
  searchBoardUpdated = output<{ search: string; favorites: boolean }>();

  searchTerm = toSignal(this.searchBoard.valueChanges, {
    initialValue: '',
  });

  boardTitles = computed(() => this.boards()?.map((b) => b.title));

  filteredTitles = computed(() => {
    const search = (this.searchTerm() ?? '').toLowerCase();
    return this.boardTitles()?.filter((title) =>
      title.toLowerCase().includes(search)
    );
  });

  filterEffect = effect(() => {
    const search = this.searchTerm();
    const favorites = this.showFavorites();

    this.searchBoardUpdated.emit({ search: search!, favorites: favorites });
  });

  toggleFavorites(value: boolean) {
    this.showFavorites.set(value);
  }

  onCreateBoardClicked(): void {
    this.createBoard.emit();
  }
}
