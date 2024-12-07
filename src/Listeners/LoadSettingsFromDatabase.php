<?php

/*
 * This file is part of fof/secure-https.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace huseyinfiliz\ModernFooter\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class LoadSettingsFromDatabase
{
    protected $packagePrefix = 'modern-footer.';

    protected $fieldsToGet = [
        'title-1',
        'copyright',
        'contact',
        'contact-link',
        'title-2',
        'text-1',
        'link-1',
        'text-2',
        'link-2',
        'text-3',
        'link-3',
        'text-4',
        'link-4',
        'title-3',
        'text-5',
        'link-5',
        'text-6',
        'link-6',
        'text-7',
        'link-7',
        'text-8',
        'link-8',
        'title-4',
        'right-text',
        'js',
    ];


    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer, $model, array $attributes): array
    {
        foreach ($this->fieldsToGet as $field) {
            $key = $this->packagePrefix.$field;
            $attributes[$key] = $this->settings->get($key);
        }

        return $attributes;
    }
}
