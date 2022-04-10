const SOURCE = {
  MESSAGING_SERVICE: 'messaging-service',
};

export type EventDetail = {
  Source: string;
  DetailType: string;
};

type Event = Record<string, Record<string, EventDetail>>;

const EVENT: Event = {
  MESSAGING_SERVICE: {
    SEND_EMAIL: {
      Source: SOURCE.MESSAGING_SERVICE,
      DetailType: 'send-email',
    },
  },
};

export { SOURCE, EVENT };
