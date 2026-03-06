‎Knowledge Board
‎
‎A production-style collaborative workspace tool for organizing ideas, documentation, and tasks using boards, columns, and cards.
‎

‎This project simulates a real SaaS internal product used by teams to manage work visually and collaboratively.
‎

‎Built using React + Vite + TypeScript with a strong focus on scalable architecture, performance, accessibility, and clean component design.
‎
‎Live Demo

‎https://dashboard-project-9ly6.onrender.com
‎(Render.com)
‎


‎Tech Stack

‎React (Vite)
‎TypeScript
‎TailwindCSS
‎React Context API for global state management
‎React Markdown for markdown parsing
‎No UI component libraries were used as required.
‎

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
