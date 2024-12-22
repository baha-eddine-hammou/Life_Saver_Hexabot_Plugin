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

@Injectable()
export class LocationPlugin extends BaseBlockPlugin<[]> {  // Use [] to indicate no settings
  template: PluginBlockTemplate = {
    patterns: ['location'],
    starts_conversation: true,
    name: 'Location Plugin',
  };

  constructor(
    pluginService: PluginService,
    private readonly blockService: BlockService,
    private readonly settingService: SettingService,
  ) {
    super('location-plugin', pluginService);
  }

  getPath(): string {
    return __dirname;
  }

  async process(
    block: Block,
    context: Context,
    _convId: string,
  ): Promise<StdOutgoingEnvelope> {
    let responseText: string = '';

    // Fetch the user's country from context.user.country
    const location_user = context.user.country

    if (location_user) {
      responseText = `Your location (country) is: ${location_user}`;
    } else {
      responseText = 'Country information not available.';
    }

    const msg: StdOutgoingTextEnvelope = {
      format: OutgoingMessageFormat.text,
      message: {
        text: responseText,
      },
    };

    return msg;
  }
}
