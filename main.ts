import * as Amqp from 'amqp-ts';

async function main() {
  const connection = new Amqp.Connection("amqp://localhost:5672");
  const exchange = connection.declareExchange("TEST", "fanout");
  const queue = connection.declareQueue("MOI");
  await queue.bind(exchange)
  await queue.activateConsumer((message) => {
    console.log("Message: " + message.getContent());
  })
}

main()