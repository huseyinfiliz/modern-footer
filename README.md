# Modern Footer Extension for Flarum

![](https://i.ibb.co/ZBjTkC5/modern-footer-v8.png)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/huseyinfiliz/modern-footer/blob/main/LICENSE)
[![Latest Stable Version](https://img.shields.io/packagist/v/huseyinfiliz/modern-footer.svg)](https://packagist.org/packages/huseyinfiliz/modern-footer)
[![Total Downloads](https://img.shields.io/packagist/dt/huseyinfiliz/modern-footer.svg)](https://packagist.org/packages/huseyinfiliz/modern-footer)
[![CI](https://github.com/huseyinfiliz/modern-footer/workflows/CI/badge.svg)](https://github.com/huseyinfiliz/modern-footer/actions)

## Description

This extension allows you to create a customizable, responsive footer for your Flarum forum. It automatically matches your forum's secondary color and is fully compatible with night mode. You can fully customize everything from the settings page, including an area to add your custom JavaScript code.

### Features

- ✨ Fully customizable footer blocks with titles and icons
- 🎨 Automatic color matching with forum theme
- 🌙 Dark mode support
- 📱 Responsive design
- 🔗 Smart link handling (internal/external)
- 🎯 Display mode options (show/hide on specific pages)
- ⚙️ Custom HTML & JavaScript support
- 📲 Mobile Tab extension compatibility

### Demo

![](https://i.ibb.co/LhBP7Pn/Ek-A-klama-2024-12-16-100146.png)

## Requirements

- PHP 8.2 or higher
- Flarum 1.8.0 or higher

## Installation

Install using Composer:

```bash
composer require huseyinfiliz/modern-footer
```

Or install via Extension Manager in your Flarum admin panel:

```
huseyinfiliz/modern-footer
```

## Updating

Update to the latest version:

```bash
composer update huseyinfiliz/modern-footer
php flarum migrate
php flarum cache:clear
```

## Removal

To remove the extension:

```bash
composer remove huseyinfiliz/modern-footer
```

## Configuration

After installation, go to your Flarum admin panel > Extensions > Modern Footer to configure:

### General Settings
- **Display Mode**: Choose where the footer should appear
  - All pages
  - Hide everywhere
  - Hide on discussions
  - Hide except index
- **Footer Sections**: Enable/disable individual footer blocks
- **Mobile Tab Height**: Adjust spacing for Mobile Tab extension

### Information Block
- Forum logo or custom HTML
- Right side text
- Social media buttons (up to 4)

### Link Blocks (up to 4 blocks)
- Custom title with FontAwesome icon
- Up to 6 links per block
- Automatic internal/external link detection

### Bottom Section
- Copyright text
- Full-width bottom bar

### Advanced
- Custom HTML injection
- Custom JavaScript code

## Mobile Support

If you are using the [Mobile Tab](https://discuss.flarum.org/d/28216-mobile-tab) extension, you can adjust the footer margin in the settings to prevent overlap.

![](https://i.ibb.co/74F3Tb0/Ek-A-klama-2024-12-16-095108.png)

## Development

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- npm

### Setup

1. Clone the repository
2. Install PHP dependencies: `composer install`
3. Install JS dependencies: `cd js && npm install`
4. Build frontend assets: `npm run build`

### Code Quality

Run quality assurance checks:

```bash
# Run all checks
composer qa

# Individual checks
composer cs          # Check code style
composer cs:fix      # Fix code style
composer analyse     # Run PHPStan
composer test        # Run tests
```

### Frontend Development

```bash
cd js
npm run dev          # Watch mode for development
npm run build        # Production build
npm run format       # Format code
npm run format-check # Check formatting
```

## Testing

Run the test suite:

```bash
composer test
```

Run tests with coverage:

```bash
composer test:coverage
```

## Links

- [Discuss](https://discuss.flarum.org/d/36603)
- [Packagist](https://packagist.org/packages/huseyinfiliz/modern-footer)
- [GitHub](https://github.com/huseyinfiliz/modern-footer)
- [Report Issues](https://github.com/huseyinfiliz/modern-footer/issues)

## Credits

Special thanks to [@umutcandev](https://github.com/umutcandev) for the new footer design and big thanks to the FoF team for their contribution!

## License

[MIT License](LICENSE)

## Support

For support, please:

1. Check the [documentation](https://github.com/huseyinfiliz/modern-footer)
2. Search [existing issues](https://github.com/huseyinfiliz/modern-footer/issues)
3. Ask on the [Flarum community](https://discuss.flarum.org/d/36603)
4. [Open a new issue](https://github.com/huseyinfiliz/modern-footer/issues/new) if needed

## Feedback & Suggestions

I'm always happy to hear more requests and suggestions! Feel free to open an issue or discuss on the Flarum community forum.

---

Made with ❤️ by [Huseyin Filiz](https://github.com/huseyinfiliz)