import { EventBridge } from 'aws-sdk';
import { EventDetail } from '@app/shared/constants/event';

const eventBridge = new EventBridge();

type PublishEventProps = {
  payload: Record<string, unknown>;
  event: EventDetail;
};

export async function publishEvent({
  payload,
  event,
}: PublishEventProps): Promise<void> {
  const params = {
    Entries: [
      {
        ...event,
        Detail: JSON.stringify(payload),
        EventBusName: process.env.EVENT_BUS,
      },
    ],
  };

  await eventBridge.putEvents(params).promise();
}
