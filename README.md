<h1 align="center">
   <b>Courier</b>
</h1>
<p align="center">Cloud messaging Abstraction Library, For Typescript and Nodejs</p>

## Table of Contents

- [Features](#features)
- [Installing](#installing)
  - [Package manager](#package-manager)
- [Usage](#example)
- [Courier API](#api)
  - [Interface](#interface)
  - [Send Message](#send-message)
  - [Receive Message](#receive-message)
  - [Get Active Provider Name](#get-active-provider-name)
  - [Set Courier Provider](#set-courier-provider)
- [License](#license)

## Features

- Cloud agnostic message queue
- Send cloud messaging
- Receive messages

## Installing

### Package manager

Using npm:

```bash
$ npm i @sapeled3/courier
```

Once the package is installed, you can import the library using `import`

```js
import { Courier } from '@sapeled3/courier';
```

## Example

> **Note** Authenticating Provider (GCP PUBSUB)
> **Disclaimer** This may vary depending on the cloud messaging provider of choice

> There are 2 ways for authenticating GCP pub/sub service and both ways require the use of a service-account created in the same project with the permissions `Pub/Sub Admin`

> **step 1 - ** this involves you exporting the location of the saved service-account json file Run

```bash
export GOOGLE_APPLICATION_CREDENTIALS={path to service-account.json}
```

> **step 2 - ** the Courier class provides a config payload to the constructer, that authenticates the courier depending on the provider, Example using `GCP_PUB/SUB`

```ts
import { Courier } from '@sapeled3/courier';

const curier = new Courier({
  config: {
    gcpPubsub: {
      privateKey: process.env.PRIVATE_KEY,
      clientEmail: process.env.CLIENT_EMAIL,
      projectId: process.env.PROJECT_ID,
    },
  },
});
```

**Usage**

```js
curier
  .sendMessage({
    topic: 'test',
    data: 'This would be awesome',
  })
  .then((res) => console.log('response: ', res)) // Handle success
  .catch((err) => console.log('error: ', err)); // Handle error
```

**async/await usage**

```ts
try {
  const response = await curier.sendMessage({
    topic: 'test',
    data: 'This would be awesome',
  });
  console.log('response: ', response); // Handle success
} catch (error) {
  console.log('error: ', err); // Handle error
}
```

## API

### interface

```ts
enum Providers {
  GCP_PUBSUB = 'GCP_PUBSUB',
  AWS_SQS = 'AWS_SQS',
  // .... provider extensibility
}

interface ICourier {
  sendMessage(message: Message): Promise<string>;
  recieveMessage(message: MessageRecieverProps): Promise<string[]>;
  setCourierProvider(payload: CourierPayload): void;
  getActiveProviderName(): Providers;
}
```

### Send Message

sends message to cloud messaging provider of choice

```ts
type Message = {
  topic: string;
  data: string;
  config?: any;
};

const response = await curier.sendMessage({
  topic: 'test',
  data: 'This would be awesome',
  config: {}, // optional
});
```

### Receive Message

This method, listens for responses from the messaging service of choice

```ts
type RecieverConfig = {
  timeout?: number;
};

type MessageRecieverProps = {
  name: string;
  config?: RecieverConfig;
};
const response = await curier.recieveMessage({
  name: 'test-sub', // subscription name
  config: {}, // optional
});
```

### Get Active Provider Name

Gets the current active provider

```ts
import { Providers } from '@sapeled3/courier';
const currentProvider = await curier.getActiveProviderName();
```

### Set Courier Provider

Update the messaging provider

```ts
import { Providers } from '@sapeled3/courier';
await curier.setCourierProvider({
  courierProvider: Providers.GCP_PUBSUB,
  config: {},
});

// provider becomes gcp pub/sub
const currentProvider = await curier.getActiveProviderName();
console.log(currentProvider); // GCP_PUBSUB
```

## License

[MIT](LICENSE)
