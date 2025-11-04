<?php

namespace huseyinfiliz\ModernFooter;

use Flarum\Extend;

$extenders = [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),
];

// Ana ayarlar
$settings = (new Extend\Settings());

$fieldsToSerialize = [
    'title-1', 'title-2', 'title-3', 'title-4', 'title-5',
    'title-fa-2', 'title-fa-3', 'title-fa-4', 'title-fa-5',
    'copyright', 'contact', 'contact-link',
    'contact-2', 'contact-link-2',
    'contact-3', 'contact-link-3',
    'contact-4', 'contact-link-4',
    'right-text',
    'info-enabled', 'links-1-enabled', 'links-2-enabled',
    'links-3-enabled', 'links-4-enabled', 'bottom-enabled',
    'js', 'html', 'mobile-tab',
    'visibility',
];

foreach ($fieldsToSerialize as $field) {
    $key = "modern-footer.{$field}";
    $settings->serializeToForum($key, $key);
}

// display-mode için özel handler
$settings->serializeToForum(
    'modern-footer.display-mode',
    'modern-footer.display-mode',
    function ($value) {
        return (int) $value;
    }
);

// Dinamik text ve link field'ları
for ($i = 1; $i <= 24; $i++) {
    $settings
        ->serializeToForum("modern-footer.text-{$i}", "modern-footer.text-{$i}")
        ->serializeToForum("modern-footer.link-{$i}", "modern-footer.link-{$i}");
}

$extenders[] = $settings;

return $extenders;