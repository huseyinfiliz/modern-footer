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

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use HuseyinFiliz\ModernFooter\Listeners\LoadSettingsFromDatabase;
use PHPUnit\Framework\TestCase;

class ExtenderBootstrapTest extends TestCase
{
    public function testExtendersAreValid(): void
    {
        $extenders = require __DIR__ . '/../../extend.php';

        $this->assertIsArray($extenders);
        $this->assertGreaterThan(0, count($extenders));

        // Verify all extenders are instances of Extend classes
        foreach ($extenders as $extender) {
            $this->assertInstanceOf(Extend\ExtenderInterface::class, $extender);
        }
    }

    public function testFrontendExtendersExist(): void
    {
        $extenders = require __DIR__ . '/../../extend.php';

        $forumFrontendExists = false;
        $adminFrontendExists = false;

        foreach ($extenders as $extender) {
            if ($extender instanceof Extend\Frontend) {
                $reflection = new \ReflectionClass($extender);
                $property = $reflection->getProperty('frontend');
                $property->setAccessible(true);
                $frontendName = $property->getValue($extender);

                if ($frontendName === 'forum') {
                    $forumFrontendExists = true;
                }
                if ($frontendName === 'admin') {
                    $adminFrontendExists = true;
                }
            }
        }

        $this->assertTrue($forumFrontendExists, 'Forum frontend extender not found');
        $this->assertTrue($adminFrontendExists, 'Admin frontend extender not found');
    }

    public function testLocalesExtenderExists(): void
    {
        $extenders = require __DIR__ . '/../../extend.php';

        $localesExists = false;

        foreach ($extenders as $extender) {
            if ($extender instanceof Extend\Locales) {
                $localesExists = true;
                break;
            }
        }

        $this->assertTrue($localesExists, 'Locales extender not found');
    }

    public function testSerializerExtenderExists(): void
    {
        $extenders = require __DIR__ . '/../../extend.php';

        $serializerExists = false;

        foreach ($extenders as $extender) {
            if ($extender instanceof Extend\ApiSerializer) {
                $serializerExists = true;
                break;
            }
        }

        $this->assertTrue($serializerExists, 'ApiSerializer extender not found');
    }
}