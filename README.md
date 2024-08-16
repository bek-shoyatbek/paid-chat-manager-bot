<!-- @format -->

# Telegram Paid Channel Management Bot

## Description

This Telegram bot manages user subscriptions for a private paid channel. It handles user registration, payments, channel access, and automatic removal of expired subscriptions. The bot is built using TypeScript, grammY, and MongoDB.

## Features

- User registration
- Simulated payment processing
- Automatic channel invite link generation
- Subscription management (5-minute test interval)
- Expiration notifications (2 minutes before expiry)
- Automatic removal of expired subscriptions
- Handling of chat join requests based on subscription status

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Telegram Bot Token
- Private Telegram Channel

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/bek-shoyatbek/paid-chat-manager-bot.git

 cd telegram-paid-channel-bot
```

2. Install dependencies:

```bash
  npm install
```

3. Create a `.env` file in the root directory with the following content:

```txt
// .env file
BOT_TOKEN=your_telegram_bot_token
MONGODB_URI=your_mongodb_connection_string
CHANNEL_ID=your_private_channel_id
```

4. Build the TypeScript code:

```bash
npm run build
```

## Usage

1. Start the bot:

```bash
npm start
```

2. In Telegram, add the bot to your private channel as an admin with the following permissions:

- Invite Users
- Manage Voice Chats
- Delete Messages
- Ban Users

3. Users can interact with the bot using the following commands:

- `/start`: Introduction to the bot
- `/register`: Register for the service
- `/pay`: Simulate a payment and receive channel access

## Testing

The bot is currently set up with short intervals for testing purposes:

- Subscriptions last for 5 minutes
- Expiration notifications are sent 2 minutes before expiry
- Checks for expiring/expired subscriptions occur every 30 seconds

To test the bot:

1. Start a chat with the bot and use `/register`
2. Use `/pay` to simulate payment and receive a channel invite link
3. Wait for about 3 minutes to receive an expiration notification
4. If you don't pay again, you'll be removed from the channel after 5 minutes
5. Try rejoining the channel without paying to test access denial
6. Use `/pay` again to regain access

## Customization

- To change the subscription duration, modify the `addMinutes` function in `src/database.ts`
- To adjust notification timing, modify the `getExpiringSubscriptions` function in `src/database.ts`
- To change check intervals, modify the `setInterval` calls in `src/bot.ts`

## Production Use

For production use, consider the following:

- Implement a real payment system
- Increase subscription duration and adjust notification timing
- Enhance error handling and logging
- Implement additional security measures
- Use a production-grade MongoDB setup

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
