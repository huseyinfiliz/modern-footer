import app from 'flarum/admin/app';
import SettingsPage from './Pages/SettingsPage';

app.initializers.add('huseyinfiliz-modern-footer', () => {
  app.registry.for('huseyinfiliz-modern-footer').registerPage(SettingsPage);
});
