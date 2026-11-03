# Changelog

All notable changes to Goosse Input are documented here.

## [1.0] – 2026-11-03

### Added

- `goosseInput.version` — readable module version
- Initial release: standalone Bootstrap 5 input modal
- Supported field types: `text`, `date`, `textarea`, `select` (incl. `multiple`), `radio`, `checkbox`, `hidden`, `number`, `range`
- Singleton guard (one input modal at a time, warns via `goosseToast` when available)
- XSS-safe field rendering (HTML escaping)
- Promise-aware `onSubmit` handling (`false` keeps the modal open)
- On-demand DOM injection with automatic cleanup
