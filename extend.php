<?php

declare(strict_types=1);

namespace huseyinfiliz\ModernFooter;

use Flarum\Extend;
use huseyinfiliz\ModernFooter\Extenders\ForumAttributes;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    // Forum'a settings expose etme
    ForumAttributes::extend(),
];