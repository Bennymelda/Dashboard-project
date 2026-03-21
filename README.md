‎Collaborative Knowledge Board

‎A web-based board for organizing cards, columns, and comments collaboratively  similar to Trello.
‎
‎ Features
‎
‎• Columns & Cards: Create, edit, and delete columns and cards.
‎
‎• Comments: Add comments to cards in real-time.
‎
‎• Drag-and-Drop: Move cards between columns or within a column.
‎
‎• Auto-Scroll on Drag: Dragging near viewport edges scrolls the page automatically.
‎
‎•Responsive Design: Works on desktop and mobile layouts.
‎
‎ Tech Stack
‎
‎Frontend: React + TypeScript
‎Routing: React Router
‎State Management: Context API
‎Markdown Support: React Markdown for card descriptions
‎UI Elements: React Icons, TailwindCSS
‎ Installation & Run
‎Bash
‎Copy code
‎# Clone the repo
‎git clone https://github.com/Bennymelda/<repo>.git
‎cd <repo>
‎
‎# Install dependencies
‎npm install
‎
‎# Start development server
‎npm run dev
‎
‎# Run tests
‎
‎npm test
‎
‎ Architecture Overview
‎
‎• ColumnComponent: Handles rendering a single column, editing its title, and managing card creation.Also displays card content, comments, and edit/delete buttons.
‎
‎: 
‎• CommentInput: Handles comment creation for individual cards.
‎
‎• Drag-and-Drop: Custom DnD implemented with onDragStart, onDrop, and onDragOver.
‎
‎• Global Drag Auto-Scroll: Smoothly scrolls viewport while dragging near edges.
‎
‎Performance Notes
‎
‎Test Setup
‎
‎3–20+ columns, 50–200+ cards with active comment threads.
‎
‎Environment: Chrome/Edge, dev mode with React DevTools.
‎
‎
‎Observations
‎
‎Works smoothly for small boards.
‎Drag-and-drop generally functional.
‎Adding comments updates only the relevant card.
‎
‎Optimizations
‎
‎React.memo for Column and Card components to reduce unnecessary re-renders.
‎
‎Drag index clamping prevents invalid moves.
‎
‎Auto-scroll only active during drag.
‎
‎Note: Virtualization (e.g., react-window) is not yet implemented. Large boards (200+ cards) may experience lag.
‎
‎Tradeoff Analysis: Custom DnD vs Library
‎
‎Aspect
‎Custom DnD
‎Library (e.g., react-beautiful-dnd)
‎Flexibility
‎Full control over behavior
‎Limited by library API
‎Complexity
‎Higher (manual index handling, edge cases)
‎Lower, built-in accessibility & animations
‎Performance
‎Reasonable for small boards
‎Optimized for large lists, supports virtualization
‎Learning Curve
‎Moderate
‎Low to moderate
‎
‎
‎We chose custom DnD for learning purposes and fine-grained control.
‎
‎ Future Improvements
‎
‎• Integrate virtualization (react-window) for smoother performance on large boards.
‎
‎• Improve drag-and-drop edge-case handling (especially last-card moves).
‎
‎• Add real-time collaborative updates via WebSockets.
‎
‎• Optimize state management to reduce re-renders further.
‎
‎Contribution
‎
‎Contributions are welcome! Open a PR or issue if you find bugs or want to suggest features.‎

‎
‎Folder Structure Explanation
‎
‎The project follows a modular and scalable architecture that separates responsibilities across components, pages, state management, and types.
‎Copy code
‎


‎my-knowledge-board/
‎
‎public/
‎  Static assets served directly
‎
‎src/
‎
‎assets/
‎  Images, icons, and static visual resources
‎

‎components/
‎  Reusable UI building blocks used across pages
‎

‎  Card.tsx
‎  Responsible for rendering individual cards including:
‎  - title
‎  - description
‎  - tags
‎  - due date
‎
‎  Column.tsx
‎  Responsible for rendering board columns and the cards inside them.
‎  Handles card creation and deletion inside a column.
‎


‎context/
‎  Global state management using React Context API
‎
‎  AppContext.ts
‎  Defines the context and exposed state/actions.
‎
‎  AppProvider.ts
‎  Provides the global state to the entire application.
‎
‎pages/
‎  Page-level components representing application screens.
‎
‎  Dashboard.tsx
‎  Displays all boards.
‎  Allows creating and deleting boards.
‎
‎  Board.tsx
‎  Displays a single board with columns and cards.
‎
‎types/
‎  Centralized TypeScript interfaces for application models.
‎
‎  index.ts
‎  Defines types such as:
‎  • Board
‎  • Column
‎  • Card
‎

‎App.tsx
‎  Root component responsible for routing and layout structure.
‎

‎main.tsx
‎  Application entry point where React renders the app.
‎

‎index.css
‎  Global styles and Tailwind configuration.
‎

‎Configuration Files
‎
‎package.json
‎Project dependencies and scripts.
‎

‎tsconfig.json
‎TypeScript configuration.
‎

‎vite.config.ts
‎Vite bundler configuration.
‎

‎tailwind.config.js
‎TailwindCSS configuration.
‎
‎

‎
‎This structure keeps components small, reusable, and maintainable while allowing the project to scale easily.


‎State Architecture
‎The application uses React Context API for centralized state management.
‎
‎
‎Why Context API?
‎
‎Context API was chosen because:
‎It prevents prop drilling across deeply nested components
‎Keeps state logic centralized
‎Works well for medium-scale applications
‎Provides a foundation for real-time updates in Stage 2
‎

‎The state is separated into domain state and UI state to maintain clarity and scalability.
‎State Shape
‎

‎The state is designed to be normalized to avoid deep nesting and reduce rendering complexity.
‎
‎
‎

‎Benefits of Normalization
‎

‎Faster updates
‎Avoids deep nested mutations
‎Easier to support real-time updates later
‎Reduces unnecessary re-renders
‎
‎State Architecture Diagram
‎
‎


‎AppProvider (Global State)
‎        │
‎        │
‎        ▼
‎    Dashboard Page
‎        │
‎        ▼
‎      Board Page
‎        │
‎ ┌───────────────┐
‎ ▼               ▼
‎Column Component Column Component
‎        │
‎        ▼
‎     Card Component
‎


‎All components access and update state through the AppContext rather than passing data through many layers of props.
‎
‎


‎Performance Strategy
‎
‎Several performance strategies were implemented to ensure efficient rendering and scalability.
‎

‎1. Memoization
‎Components that render lists such as cards and columns use memoization strategies (React.memo) to prevent unnecessary re-renders.
‎

‎2. Normalized State
‎Using normalized state prevents deep object mutations and allows updates to be more targeted.
‎This reduces React reconciliation cost and improves rendering performance.
‎

‎3. Component Separation
‎Components are broken down into small reusable units:
‎Dashboard
‎Board
‎Column
‎Card
‎This ensures updates only affect the necessary part of the UI.
‎

‎4. Lazy Loading
‎The Board page is lazily loaded to reduce the initial bundle size and improve loading performance.
‎This allows the dashboard to load faster while heavier board logic loads only when needed.
‎


‎Accessibility Implementation
‎
‎Accessibility was treated as a first-class concern.
‎Semantic HTML
‎Proper HTML elements are used:
‎button for actions
‎section and article for structural grouping
‎form inputs for user interaction
‎ARIA Labels
‎ARIA labels are added to interactive elements such as:
‎card creation buttons
‎column actions
‎board controls
‎Example:
‎Copy code
‎
‎<button aria-label="Create new card">
‎
‎
‎Keyboard Navigation
‎Modals and interactive UI elements support keyboard navigation including:
‎
‎Tab navigation
‎Escape to close modals
‎Focus management
‎Focus Management
‎Focus is automatically moved to modals and returned to the previous element when closed.
‎This ensures usability for keyboard and screen reader users.
‎
‎Key Engineering Decisions
‎

‎1. Context API Instead of Redux
‎Redux was intentionally avoided to keep the architecture lightweight while still enabling global state sharing.
‎Context API is sufficient for the current scope and can be upgraded later if the application grows.
‎

‎2. TypeScript Everywhere
‎TypeScript ensures:
‎strong type safety
‎predictable state updates
‎improved maintainability
‎better developer experience
‎All domain models such as Board, Column, and Card are strictly typed.
‎

‎3. TailwindCSS for Styling
‎Tailwind was used because it:
‎enables fast UI development
‎enforces consistent spacing and layout
‎avoids large CSS files
‎keeps styles colocated with components
‎

‎4. Component-Driven Architecture
‎The UI was designed using reusable components rather than page-specific implementations.
‎This improves scalability and maintainability as the application grows.
‎

‎5. Markdown Parsing
‎Card descriptions support Markdown formatting using a markdown parser so that text such as:
‎Copy code
‎
‎**bold**
‎# heading
‎- lists
‎renders properly instead of showing raw markdown syntax.
‎


‎Future Improvements (Stage 2 Preparation)
‎
‎The architecture was designed with future features in mind:
‎Real-time collaboration
‎Backend synchronization
‎Drag-and-drop board interactions
‎User authentication
‎Activity history
‎Comments on cards
‎The normalized state structure will support these features without major refactoring.
‎
‎Running the Project
‎Install dependencies
‎Copy code
‎
‎npm install
‎Start development server
‎Copy code
‎
‎npm run dev
‎Build for production
‎Copy code
‎
‎npm run build
‎Author
‎Frontend Engineer
‎Stage 1 Submission –  Knowledge Board
‎
## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
