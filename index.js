exports.helloPubSub = (event, context) => {
    const message = event.data
      ? Buffer.from(event.data, 'base64').toString()
      : 'Hello, World';
    console.log(message);
  };