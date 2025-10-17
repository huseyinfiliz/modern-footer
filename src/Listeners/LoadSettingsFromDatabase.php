<?php

declare(strict_types=1);

/*
 * This file is part of huseyinfiliz/modern-footer.
 *
 * Copyright (c) Huseyin Filiz.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace HuseyinFiliz\ModernFooter\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class LoadSettingsFromDatabase
{
    protected string $packagePrefix = 'modern-footer.';

    /**
     * @var array<string>
     */
    protected array $fieldsToGet = [
        'title-1',
        'title-2',
        'title-3',
        'title-4',
        'title-5',
        'title-fa-2',
        'title-fa-3',
        'title-fa-4',
        'title-fa-5',
        'copyright',
        'contact',
        'contact-link',
        'contact-2',
        'contact-link-2',
        'contact-3',
        'contact-link-3',
        'contact-4',
        'contact-link-4',
        'right-text',
        'info-enabled',
        'links-1-enabled',
        'links-2-enabled',
        'links-3-enabled',
        'links-4-enabled',
        'bottom-enabled',
        'js',
        'html',
        'mobile-tab',
        'display-mode',
    ];

    public function __construct(protected SettingsRepositoryInterface $settings)
    {
        // Adding text and link fields dynamically
        for ($i = 1; $i <= 24; $i++) {
            $this->fieldsToGet[] = "text-{$i}";
            $this->fieldsToGet[] = "link-{$i}";
        }
    }

    /**
     * @param ForumSerializer $serializer
     * @param mixed $model
     * @param array<string, mixed> $attributes
     * @return array<string, mixed>
     */
    public function __invoke(ForumSerializer $serializer, $model, array $attributes): array
    {
        foreach ($this->fieldsToGet as $field) {
            $key = $this->packagePrefix . $field;
            $attributes[$key] = $this->settings->get($key);

            if ($field === 'display-mode') {
                $attributes[$key] = (int) $attributes[$key];
            }
        }

        return $attributes;
    }
}