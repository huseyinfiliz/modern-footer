<?php
declare(strict_types=1);

namespace huseyinfiliz\ModernFooter\Extenders;

use Flarum\Extend\Settings;

class ForumAttributes
{
    public static function extend(): Settings
    {
        $settings = new Settings();

        $mainFields = [
            'title-1', 'title-2', 'title-3', 'title-4', 'title-5',
            'title-fa-2', 'title-fa-3', 'title-fa-4', 'title-fa-5',
            'copyright', 'contact', 'contact-link',
            'contact-2', 'contact-link-2',
            'contact-3', 'contact-link-3',
            'contact-4', 'contact-link-4',
            'right-text', 'js', 'html', 'visibility',
            'mobile-tab',
        ];

        foreach ($mainFields as $field) {
            $settings->serializeToForum("modern-footer.{$field}", "modern-footer.{$field}");
        }

        $booleanFields = [
            'info-enabled', 'links-1-enabled', 'links-2-enabled',
            'links-3-enabled', 'links-4-enabled', 'bottom-enabled',
        ];

        foreach ($booleanFields as $field) {
            $settings->serializeToForum("modern-footer.{$field}", "modern-footer.{$field}");
        }

        $settings->serializeToForum(
            'modern-footer.display-mode',
            'modern-footer.display-mode',
            function ($value) {
                return (int) ($value ?? 0);
            }
        );


        for ($i = 1; $i <= 24; $i++) {
            $settings
                ->serializeToForum("modern-footer.text-{$i}", "modern-footer.text-{$i}")
                ->serializeToForum("modern-footer.link-{$i}", "modern-footer.link-{$i}");
        }

        return $settings;
    }
}