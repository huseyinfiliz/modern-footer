import Extend from 'flarum/common/extenders';
import SettingsPage from './Pages/SettingsPage';

export default [
  new Extend.Admin().page(SettingsPage),
];