const PubNub = require('pubnub');

const pubnub = new PubNub({
  publishKey: 'pub-c-c8b86454-f170-4cbb-8e4f-ac7bd7b9c77c',
  subscribeKey: 'sub-c-a79e81ce-b502-11ec-8a86-d29fac035801',
  uuid: 'sec-c-ZWNhYWQ1M2ItZTlhYy00MTBkLWJmODQtYTE3ZTVhNDY4ZjEz',
});

async function publishSampleMessage() {
  console.log(
    "Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish."
  );
  const result = await pubnub.publish({
    channel: 'hello_world',
    message: {
      title: 'greeting',
      description: 'hello world!',
    },
  });
  console.log('result', result);
}

pubnub.addListener({
  status: function (statusEvent) {
    if (statusEvent.category === 'PNConnectedCategory') {
      publishSampleMessage();
    }
  },
  message: function (messageEvent) {
    console.log(messageEvent.message.title);
    console.log(messageEvent.message.description);
  },
  presence: function (presenceEvent) {
    // handle presence
  },
});

console.log('Subscribing..');

pubnub.subscribe({
  channels: ['hello_world'],
});
