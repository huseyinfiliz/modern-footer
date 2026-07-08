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

namespace huseyinfiliz\ModernFooter\Tests\Unit;

use Flarum\Extend\Settings;
use huseyinfiliz\ModernFooter\Extenders\ForumAttributes;
use PHPUnit\Framework\TestCase;

class ForumAttributesTest extends TestCase
{
    public function testExtendReturnsSettingsExtender(): void
    {
        $this->assertInstanceOf(Settings::class, ForumAttributes::extend());
    }

    public function testMainSettingsAreDefined(): void
    {
        $source = file_get_contents(__DIR__ . '/../../src/Extenders/ForumAttributes.php');

        $expectedFields = [
            'title-1',
            'title-2',
            'title-3',
            'title-4',
            'title-5',
            'copyright',
            'contact',
            'contact-link',
            'right-text',
            'js',
            'html',
            'visibility',
            'mobile-tab',
        ];

        foreach ($expectedFields as $field) {
            $this->assertStringContainsString($field, $source);
        }
    }

    public function testBooleanSettingsAreDefined(): void
    {
        $source = file_get_contents(__DIR__ . '/../../src/Extenders/ForumAttributes.php');

        $expectedFields = [
            'info-enabled',
            'links-1-enabled',
            'links-2-enabled',
            'links-3-enabled',
            'links-4-enabled',
            'bottom-enabled',
        ];

        foreach ($expectedFields as $field) {
            $this->assertStringContainsString($field, $source);
        }

        $this->assertStringContainsString('boolval', $source);
    }

    public function testDisplayModeIsCastToInteger(): void
    {
        $source = file_get_contents(__DIR__ . '/../../src/Extenders/ForumAttributes.php');

        $this->assertStringContainsString('modern-footer.display-mode', $source);
        $this->assertMatchesRegularExpression('/return\s+\(int\)\s*\(\$value\s*\?\?\s*0\);/', $source);
    }

    public function testDynamicTextAndLinkFieldsAreDefined(): void
    {
        $source = file_get_contents(__DIR__ . '/../../src/Extenders/ForumAttributes.php');

        $this->assertStringContainsString('for ($i = 1; $i <= 24; $i++)', $source);
        $this->assertStringContainsString('text-{$i}', $source);
        $this->assertStringContainsString('link-{$i}', $source);
    }
}