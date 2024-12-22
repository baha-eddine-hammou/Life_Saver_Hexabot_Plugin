import { SettingType } from '@/setting/schemas/types';

const SETTINGS = [
  {
    label: 'API URL',
    group: 'Weather Settings',
    type: SettingType.text,
    value: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,wind_speed_10m',
  },
  {
    label: 'Response Message',
    group: 'Weather Settings',
    type: SettingType.text,
    value: 'Here is the weather data:',
  },
];

export default SETTINGS;
