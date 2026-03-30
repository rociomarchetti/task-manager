import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal,
} from '@angular/core';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';
import { mockBoards } from 'app/core/services/boards-service/__mocks__/mock-boards';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board-list',
  imports: [
    Panel,
    PanelBodyDirective,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListFeature {
  boards = signal(mockBoards);
  showFavorites = signal(false);
  searchBoard = new FormControl('');
  isFocused = signal(false);

  createBoard = output<void>();

  boardsToShow = computed(() => {
    const search = (this.searchTerm() ?? '').toLowerCase();

    const baseList = this.showFavorites()
      ? this.boards().filter((b) => b.isFavorite)
      : this.boards();

    return baseList.filter((b) => b.title.toLowerCase().includes(search));
  });

  searchTerm = toSignal(this.searchBoard.valueChanges, {
    initialValue: '',
  });

  boardTitles = computed(() => this.boards().map((b) => b.title));

  filteredTitles = computed(() => {
    const search = (this.searchTerm() ?? '').toLowerCase();
    return this.boardTitles().filter((title) =>
      title.toLowerCase().includes(search)
    );
  });

  toggleFavorites(value: boolean) {
    this.showFavorites.set(value);
  }

  onCreateBoardClicked(): void {
    this.createBoard.emit();
  }
}
