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

namespace HuseyinFiliz\ModernFooter\Tests\Unit;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use HuseyinFiliz\ModernFooter\Listeners\LoadSettingsFromDatabase;
use PHPUnit\Framework\TestCase;

class LoadSettingsFromDatabaseTest extends TestCase
{
    private SettingsRepositoryInterface $settings;
    private LoadSettingsFromDatabase $listener;

    protected function setUp(): void
    {
        parent::setUp();

        $this->settings = $this->createMock(SettingsRepositoryInterface::class);
        $this->listener = new LoadSettingsFromDatabase($this->settings);
    }

    public function testConstructorAddsTextAndLinkFields(): void
    {
        // Use reflection to access protected property
        $reflection = new \ReflectionClass($this->listener);
        $property = $reflection->getProperty('fieldsToGet');
        $property->setAccessible(true);
        $fields = $property->getValue($this->listener);

        // Check that text and link fields are added (24 * 2 = 48 additional fields)
        $textFields = array_filter($fields, fn($field) => str_starts_with($field, 'text-'));
        $linkFields = array_filter($fields, fn($field) => str_starts_with($field, 'link-'));

        $this->assertCount(24, $textFields);
        $this->assertCount(24, $linkFields);
    }

    public function testInvokeReturnsAttributesWithSettings(): void
    {
        $this->settings->method('get')
            ->willReturnCallback(function ($key) {
                return match ($key) {
                    'modern-footer.title-1' => 'Test Footer',
                    'modern-footer.display-mode' => '2',
                    'modern-footer.info-enabled' => '1',
                    default => null,
                };
            });

        $serializer = $this->createMock(ForumSerializer::class);
        $model = new \stdClass();
        $attributes = [];

        $result = ($this->listener)($serializer, $model, $attributes);

        $this->assertIsArray($result);
        $this->assertArrayHasKey('modern-footer.title-1', $result);
        $this->assertArrayHasKey('modern-footer.display-mode', $result);
        $this->assertEquals('Test Footer', $result['modern-footer.title-1']);
        $this->assertEquals(2, $result['modern-footer.display-mode']); // Should be cast to int
    }

    public function testDisplayModeIsCastToInteger(): void
    {
        $this->settings->method('get')
            ->willReturnCallback(function ($key) {
                return $key === 'modern-footer.display-mode' ? '3' : null;
            });

        $serializer = $this->createMock(ForumSerializer::class);
        $model = new \stdClass();
        $attributes = [];

        $result = ($this->listener)($serializer, $model, $attributes);

        $this->assertIsInt($result['modern-footer.display-mode']);
        $this->assertEquals(3, $result['modern-footer.display-mode']);
    }

    public function testAllExpectedFieldsAreProcessed(): void
    {
        $this->settings->method('get')
            ->willReturn('test-value');

        $serializer = $this->createMock(ForumSerializer::class);
        $model = new \stdClass();
        $attributes = [];

        $result = ($this->listener)($serializer, $model, $attributes);

        // Check some key fields exist
        $expectedFields = [
            'modern-footer.title-1',
            'modern-footer.copyright',
            'modern-footer.contact',
            'modern-footer.info-enabled',
            'modern-footer.bottom-enabled',
            'modern-footer.js',
            'modern-footer.html',
        ];

        foreach ($expectedFields as $field) {
            $this->assertArrayHasKey($field, $result, "Field {$field} is missing");
        }
    }
}