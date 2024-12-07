import app from 'flarum/admin/app';

app.initializers.add('huseyinfiliz-modern-footer', () => {
  app.extensionData
    .for('huseyinfiliz-modern-footer')
    // General Settings
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.title-1'),
      setting: 'modern-footer.title-1',
	  help: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.title-1-help'),
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.copyright'),
      setting: 'modern-footer.copyright',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.contact'),
      setting: 'modern-footer.contact',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.contact-link'),
      setting: 'modern-footer.contact-link',
      type: 'text',
    })

    // First Links Column
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.title-2'),
      setting: 'modern-footer.title-2',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-1'),
      setting: 'modern-footer.text-1',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-1'),
      setting: 'modern-footer.link-1',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-2'),
      setting: 'modern-footer.text-2',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-2'),
      setting: 'modern-footer.link-2',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-3'),
      setting: 'modern-footer.text-3',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-3'),
      setting: 'modern-footer.link-3',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-4'),
      setting: 'modern-footer.text-4',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-4'),
      setting: 'modern-footer.link-4',
      type: 'text',
    })

    // Second Links Column
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.title-3'),
      setting: 'modern-footer.title-3',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-5'),
      setting: 'modern-footer.text-5',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-5'),
      setting: 'modern-footer.link-5',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-6'),
      setting: 'modern-footer.text-6',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-6'),
      setting: 'modern-footer.link-6',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-7'),
      setting: 'modern-footer.text-7',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-7'),
      setting: 'modern-footer.link-7',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text-8'),
      setting: 'modern-footer.text-8',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.link-8'),
      setting: 'modern-footer.link-8',
      type: 'text',
    })

    // About Us Section
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.title-4'),
      setting: 'modern-footer.title-4',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.right-text'),
      setting: 'modern-footer.right-text',
      type: 'textarea',
    })

    // Custom JS
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.js'),
      setting: 'modern-footer.js',
	  help: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.js-help'),
      type: 'textarea',
	  rows: 10,
    });
});
