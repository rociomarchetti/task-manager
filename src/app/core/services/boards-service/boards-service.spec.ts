import { Board, NewBoardData, UserBoardsSummary } from '@shared/models';
import { firstValueFrom } from 'rxjs';
import { BoardsService } from './boards-service';

describe('GIVEN: BoardsService', () => {
  let service: BoardsService;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    jest.spyOn(localStorage.__proto__, 'getItem');
    jest.spyOn(localStorage.__proto__, 'setItem');

    service = new BoardsService();
  });

  describe('WHEN: getBoardsForUser', () => {
    it('THEN: should retrieve all boards for the given user', async () => {
      const responseMock: UserBoardsSummary = {
        userId: 1,
        boards: [{} as Board],
      };
      const result = await firstValueFrom(service.getBoardsForUser(1));

      expect(result.userId).toBe(responseMock.userId);
      expect(Array.isArray(result.boards)).toBe(true);
      expect(
        result.boards.every((board) => board.userId === responseMock.userId)
      ).toBe(true);
    });

    it('THEN: should retrieve empty array if user has no boards', async () => {
      const mockNoBoardsUserId = 999;
      const result = await firstValueFrom(
        service.getBoardsForUser(mockNoBoardsUserId)
      );

      expect(result.boards).toEqual([]);
    });
  });

  describe('WHEN: getBoardById', () => {
    it('THEN: should retrieve the board if id exists', async () => {
      const mockBoardId = 'A';
      const result = await firstValueFrom(service.getBoardById(mockBoardId));

      expect(result).not.toBeNull();
      expect(result?.id).toBe(mockBoardId);
    });

    it('THEN: should retrieve null if board does not exist', async () => {
      const noBoardId = 'ZZZ';
      const result = await firstValueFrom(service.getBoardById(noBoardId));

      expect(result).toBeNull();
    });
  });

  describe('WHEN: updateBoard', () => {
    const mockOriginalBoard: Board = {} as Board;
    const updatedBoard = {
      ...mockOriginalBoard!,
      title: 'Updated Board',
    };

    it('THEN: should update an existing board', async () => {
      const result = await firstValueFrom(service.updateBoard(updatedBoard));

      expect(result.title).toBe('Updated Board');
    });

    it('THEN: should save updated boards in local storage', async () => {
      await firstValueFrom(
        service.updateBoard({
          ...mockOriginalBoard!,
          title: 'Updated',
        })
      );

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'fake_boards',
        expect.any(String)
      );
    });
  });

  describe('WHEN: createNewBoard', () => {
    const newBoardMock: NewBoardData = {
      title: 'New Board',
      isFavorite: false,
    };

    it('THEN: should create a new board', async () => {
      const result = await firstValueFrom(
        service.createNewBoard(newBoardMock, 1)
      );

      expect(result.title).toBe(newBoardMock.title);
      expect(result.userId).toBe(1);
      expect(result.id).toBeDefined();
    });

    it('THEN: should save boards in local storage', async () => {
      await firstValueFrom(service.createNewBoard(newBoardMock, 1));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'fake_boards',
        expect.any(String)
      );
    });

    it('THEN: should assign default values', async () => {
      const result = await firstValueFrom(
        service.createNewBoard(newBoardMock, 1)
      );

      expect(result.description).toBe('');
      expect(result.isFavorite).toBe(false);
      expect(result.isWip).toBe(false);
      expect(result.addedColumns).toEqual([]);
    });
  });

  describe('WHEN: deleteBoard', () => {
    const mockBoardId = 'A';

    it('THEN: should delete the board', async () => {
      await firstValueFrom(service.deleteBoard(mockBoardId));

      const result = await firstValueFrom(service.getBoardById(mockBoardId));

      expect(result).toBeNull();
    });

    it('THEN: should save boards in local storage', async () => {
      await firstValueFrom(service.deleteBoard(mockBoardId));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'fake_boards',
        expect.any(String)
      );
    });
  });
});
