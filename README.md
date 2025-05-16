# CumulusUI

## Description
CumulusUI is a lightweight and modern UI component library built with React and TypeScript. It provides a collection of reusable, customizable components designed to streamline the development of responsive and accessible web applications. Styled with Tailwind CSS, CumulusUI ensures a consistent and visually appealing design.

## Features
- **Reusable Components**: Buttons, modals, forms, and more, ready for integration.
- **TypeScript Support**: Fully typed for better developer experience.
- **Tailwind CSS**: Flexible and utility-first styling.
- **Responsive Design**: Components adapt seamlessly to different screen sizes.
- **Accessible**: Built with ARIA standards for inclusivity.

## Prerequisites
- Node.js (v16.x or higher)
- npm (v8.x or higher)
- React (v18.x or higher)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jasonnn13/CumulusUI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CumulusUI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the development server:
   ```bash
   npm run dev
   ```
   This will launch a Storybook instance to preview components at `http://localhost:6006`.
2. Import components into your React project:
   ```jsx
   import { Button } from 'cumulusui';

   function App() {
     return <Button label="Click Me" onClick={() => alert('Clicked!')} />;
   }
   ```
3. Customize components using props or Tailwind classes as needed.

## Scripts
- `npm run dev`: Start Storybook for component development.
- `npm run build`: Build the library for production.
- `npm run lint`: Run ESLint for code linting.
- `npm run test`: Run tests with Jest.

## Project Structure
```
├── src/                # Source code for components
├── stories/            # Storybook stories for component previews
├── dist/               # Built library output
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

## Contributing
We welcome contributions to CumulusUI! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a clear description of your changes.

Please ensure your code follows the project's ESLint and Prettier configurations.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, reach out via [GitHub Issues](https://github.com/Jasonnn13/CumulusUI/issues) or contact [Jasonnn13](https://github.com/Jasonnn13).
