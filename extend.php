<?php

/*
 * This file is part of huseyinfiliz/modern-footer.
 *
 * Copyright (c) Huseyin Filiz.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace huseyinfiliz\ModernFooter;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    // Serialize all modern-footer.* settings to forum
    (new Extend\Settings())
        ->serializeToForum('modern-footer.*', 'modern-footer.*'),
];