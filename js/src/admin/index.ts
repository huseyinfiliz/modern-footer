import app from 'flarum/admin/app';

app.initializers.add('huseyinfiliz-modern-footer', () => {
  app.extensionData
    .for('huseyinfiliz-modern-footer')
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.text'),
      setting: 'modern-footer.text',
      type: 'text',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.height'),
      setting: 'modern-footer.height',
      placeholder: '50',
      type: 'number',
      simple: 'simple',
    })
    .registerSetting({
      label: app.translator.trans('huseyinfiliz-modern-footer.admin.settings.js'),
      setting: 'modern-footer.js',
      type: 'text',
    });
});
