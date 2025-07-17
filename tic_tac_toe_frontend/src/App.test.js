import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock all animation and sound related modules
jest.mock('lottie-react', () => ({ __esModule: true, default: () => <div data-testid="lottie-animation" /> }));
jest.mock('react-confetti', () => ({ __esModule: true, default: () => <div data-testid="confetti" /> }));
jest.mock('use-sound', () => () => [jest.fn()]);
jest.mock('./assets/animations/victory.json', () => ({}));
jest.mock('./assets/animations/welcome.json', () => ({}));
jest.mock('./assets/sounds/click.mp3', () => '');

describe('Tic Tac Toe App', () => {
  beforeEach(() => {
    // Reset timers before each test
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Clean up timers after each test
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  beforeEach(() => {
    // Mock window.innerWidth/Height for Confetti component
    window.innerWidth = 1024;
    window.innerHeight = 768;
  });

  test('renders welcome modal initially', async () => {
    render(<App />);
    
    // Wait for loading screen to disappear and welcome modal to appear
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText(/Welcome to Tic Tac Toe!/i)).toBeInTheDocument();
      expect(screen.getByText(/Let's Play!/i)).toBeInTheDocument();
    });
  });

  test('shows mode selector after welcome modal', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Click through welcome modal
    const playButton = await waitFor(() => screen.getByText(/Let's Play!/i));
    fireEvent.click(playButton);

    // Check mode selector appears
    await waitFor(() => {
      expect(screen.getByText(/Choose Your Game Mode/i)).toBeInTheDocument();
      expect(screen.getByText(/Player vs Player/i)).toBeInTheDocument();
      expect(screen.getByText(/Player vs AI/i)).toBeInTheDocument();
    });
  });

  test('starts PVP game mode correctly', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Click through welcome modal
    const playButton = await waitFor(() => screen.getByText(/Let's Play!/i));
    fireEvent.click(playButton);
    
    // Select PVP mode
    const pvpButton = await waitFor(() => screen.getByText(/Player vs Player/i));
    fireEvent.click(pvpButton);

    // Verify game started
    await waitFor(() => {
      expect(screen.getByText(/X's Turn/i)).toBeInTheDocument();
      expect(screen.getByText(/Scoreboard/i)).toBeInTheDocument();
    });
  });

  test('handles player moves correctly', async () => {
    render(<App />);
    
    // Setup game
    fireEvent.click(screen.getByText(/Let's Play!/i));
    fireEvent.click(screen.getByText(/Player vs Player/i));

    // Get all cells
    const cells = document.querySelectorAll('.cell');
    
    // Make moves
    fireEvent.click(cells[0]); // X plays
    expect(cells[0].textContent).toBe('X');
    expect(screen.getByText(/O's Turn/i)).toBeInTheDocument();

    fireEvent.click(cells[4]); // O plays
    expect(cells[4].textContent).toBe('O');
    expect(screen.getByText(/X's Turn/i)).toBeInTheDocument();
  });

  test('declares winner correctly', async () => {
    render(<App />);
    
    // Setup game
    fireEvent.click(screen.getByText(/Let's Play!/i));
    fireEvent.click(screen.getByText(/Player vs Player/i));

    const cells = document.querySelectorAll('.cell');
    
    // Create winning condition for X: top row
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins

    // Check for winner announcement
    expect(screen.getByText(/X Wins!/i)).toBeInTheDocument();
  });

  test('handles draw game correctly', async () => {
    render(<App />);
    
    // Setup game
    fireEvent.click(screen.getByText(/Let's Play!/i));
    fireEvent.click(screen.getByText(/Player vs Player/i));

    const cells = document.querySelectorAll('.cell');
    
    // Play to a draw
    // X O X
    // X O O
    // O X X
    const moveSequence = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    moveSequence.forEach(index => {
      fireEvent.click(cells[index]);
    });

    // Verify draw state
    expect(screen.getByText(/It's a Draw!/i)).toBeInTheDocument();
  });

  test('reset button clears the board', async () => {
    render(<App />);
    
    // Setup and start game
    fireEvent.click(screen.getByText(/Let's Play!/i));
    fireEvent.click(screen.getByText(/Player vs Player/i));

    const cells = document.querySelectorAll('.cell');
    
    // Make some moves
    fireEvent.click(cells[0]);
    fireEvent.click(cells[4]);
    
    // Reset game
    fireEvent.click(screen.getByText(/Reset Game/i));
    
    // Verify board is cleared
    cells.forEach(cell => {
      expect(cell.textContent).toBe('');
    });
    expect(screen.getByText(/X's Turn/i)).toBeInTheDocument();
  });
});
