# Development

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tillsanders/esm-itter.git
   cd esm-itter
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Project Structure

- `src/` — Main source code (TypeScript, ESM)
- `benchmarks/` — Performance benchmarks (requires separate install)
- `test/` — Unit tests
- `docs/` — Documentation

## Useful Scripts

- `npm test` — Run unit tests
- `npm run coverage` — Generate code coverage report
- `npm run build` — Build the module (TypeScript compilation)
- `npm run lint` — Run linter
- `npm run prettier` — Format code with Prettier

## Running Benchmarks

Benchmarks are not included in the npm package. To run them:

1. Install dependencies in the benchmarks folder:
   ```bash
   cd benchmarks
   npm install
   cd ..
   ```
2. Run the benchmark:
   ```bash
   npm run benchmark
   ```

Output is displayed in the console, showing performance comparisons with other event emitters.

## Testing

Unit tests are written in TypeScript and can be run with `npm test`. Coverage reports are generated
with `npm run coverage`.

## Documentation

The documentation is built using VitePress and can be found in the `docs/` directory. To run a local
development server for the documentation, use:

```bash
npm run docs:dev
```

This will start a local server at `http://localhost:5173/esm-itter` where you can view the
documentation.

## Publishing

ESMitter is published to to npm using GitHub Actions. To publish a new version, update the
version in `package.json`, run `npm install` and push the changes to the `main` branch. Create a
new release on GitHub, and the CI will automatically publish the new version to npm after running
tests and checks.

## Contributing

Contributions are welcome! Please:

- Follow the existing code style and conventions.
- Write unit tests for new features or bug fixes.
- Update documentation as needed.
- Open a pull request with a clear description of your changes.

## Troubleshooting

- If you encounter issues with dependencies, try deleting `node_modules` and running `npm ci` again.
- For benchmark issues, ensure you have installed dependencies in the `benchmarks/` folder.
