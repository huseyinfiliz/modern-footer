# Modern Footer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Latest Stable Version](https://img.shields.io/packagist/v/huseyinfiliz/modern-footer.svg)](https://packagist.org/packages/huseyinfiliz/modern-footer)
[![Total Downloads](https://img.shields.io/packagist/dt/huseyinfiliz/modern-footer.svg)](https://packagist.org/packages/huseyinfiliz/modern-footer)

A [Flarum](http://flarum.org) extension that allows you to create a customizable, responsive footer for your forum.

![Modern Footer Demo](https://i.ibb.co/ZBjTkC5/modern-footer-v8.png)

## Features

- ✨ Fully customizable footer blocks with titles and icons
- 🎨 Automatic color matching with your forum theme
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔗 Smart link handling (internal links open normally, external in new tab)
- 🎯 Display mode options (control where footer appears)
- ⚙️ Custom HTML & JavaScript injection
- 📲 Mobile Tab extension compatibility

![Settings Example](https://i.ibb.co/LhBP7Pn/Ek-A-klama-2024-12-16-100146.png)

## Installation

Install with Composer:

```bash
composer require huseyinfiliz/modern-footer:"*"
```

Or use the [Extension Manager](https://extiverse.com/extension/flarum/extension-manager) in your admin panel and search for `huseyinfiliz/modern-footer`.

## Updating

```bash
composer update huseyinfiliz/modern-footer
php flarum migrate
php flarum cache:clear
```

## Configuration

After installation, enable the extension and configure it in your admin panel:

**Admin → Extensions → Modern Footer**


### General Settings

- **Display Mode**: Control where the footer appears
  - All pages
  - Hide everywhere  
  - Hide on discussion pages
  - Hide except on index
  
- **Footer Sections**: Enable or disable individual footer blocks
- **Mobile Tab Height**: Adjust footer margin for Mobile Tab extension compatibility

### Information Block

Customize the left section of your footer:
- Forum logo or custom HTML title
- Descriptive text
- Social media buttons (up to 4 with custom icons and links)

### Link Blocks

Create up to 4 customizable link blocks:
- Custom title with FontAwesome icon
- Up to 6 links per block
- Links automatically detected as internal/external

### Bottom Bar

- Custom copyright text
- Full-width bottom section

### Advanced Options

- **Custom HTML**: Inject custom HTML content
- **Custom JavaScript**: Add custom JS code

## Mobile Tab Compatibility

If you're using the [Mobile Tab](https://discuss.flarum.org/d/28216-mobile-tab) extension, you can adjust the footer margin in the settings to prevent overlap.

![Mobile Tab Setting](https://i.ibb.co/74F3Tb0/Ek-A-klama-2024-12-16-095108.png)

## Links

- [Flarum Community](https://discuss.flarum.org/d/36603)
- [Packagist](https://packagist.org/packages/huseyinfiliz/modern-footer)
- [Source Code](https://github.com/huseyinfiliz/modern-footer)
- [Report Issues](https://github.com/huseyinfiliz/modern-footer/issues)

## Credits

Special thanks to:
- [@umutcandev](https://github.com/umutcandev) for the new footer design
- The FriendsOfFlarum team for their contributions

## Support

Having trouble? 

1. Check the [documentation](https://github.com/huseyinfiliz/modern-footer#readme)
2. Search [existing issues](https://github.com/huseyinfiliz/modern-footer/issues)
3. Ask in the [Flarum community](https://discuss.flarum.org/d/36603)
4. [Open a new issue](https://github.com/huseyinfiliz/modern-footer/issues/new)

## License

[MIT License](LICENSE) - Copyright (c) 2025 Huseyin Filiz