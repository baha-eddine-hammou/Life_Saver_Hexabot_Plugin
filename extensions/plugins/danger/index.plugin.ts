import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import {
  OutgoingMessageFormat,
  StdOutgoingEnvelope,
  StdOutgoingTextEnvelope,
} from '@/chat/schemas/types/message';
import { BlockService } from '@/chat/services/block.service';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import { SettingService } from '@/setting/services/setting.service';
import { Injectable } from '@nestjs/common';

import axios from 'axios';
import SETTINGS from './settings';

@Injectable()
export class WeatherPlugin extends BaseBlockPlugin<typeof SETTINGS> {
  template: PluginBlockTemplate = {
    patterns: ['weather'],
    starts_conversation: true,
    name: 'Weather Plugin',
  };

  constructor(
    pluginService: PluginService,
    private readonly blockService: BlockService,
    private readonly settingService: SettingService,
  ) {
    super('danger-plugin', pluginService);
  }

  getPath(): string {
    return __dirname;
  }

  async process(
    block: Block,
    context: Context,
    _convId: string,
  ): Promise<StdOutgoingEnvelope> {
    const settings = await this.settingService.getSettings();
    const args = this.getArguments(block);

    // Fetch weather data from API
    const apiUrl =
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,wind_speed_10m';

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      const temperature = data.hourly.temperature_2m[0];
      const windSpeed = data.hourly.wind_speed_10m[0];
      // Generate response
      let responseText: string = '';

      if (temperature < 0 || windSpeed > 15) {
        responseText = 'WARNING: You are in danger due to extreme weather conditions!';
      } else {
        responseText = 'The weather is safe at the moment.';
      }

      
      const msg: StdOutgoingTextEnvelope = {
        format: OutgoingMessageFormat.text,
        message: {
          text: responseText,
        },
      };

      return msg;
    } catch (error) {
      const errorMsg: StdOutgoingTextEnvelope = {
        format: OutgoingMessageFormat.text,
        message: {
          text: 'Failed to fetch weather data. Please try again later.',
        },
      };

      return errorMsg;
    }
  }
}
