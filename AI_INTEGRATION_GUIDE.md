# GramJS API Documentation for AI Integration

## Overview

This file contains information about the comprehensive API documentation available for gramjs, specifically formatted for AI systems to understand and integrate the library.

## Quick Reference

**Generate Documentation:**
```bash
npm run docs:json
```

**Output Location:** `./docs/documentation.json` (72MB JSON file)

## What's in the Documentation

The JSON documentation contains complete information about:

### Core Classes

1. **TelegramClient** - Main client for interacting with Telegram
   - Authentication methods (start, signIn, signUp)
   - Message operations (sendMessage, getMessages, editMessage, deleteMessages)
   - File operations (sendFile, downloadFile, uploadFile)
   - Chat operations (getDialogs, getParticipants, createChannel, editAdmin)
   - Event handling (addEventHandler, removeEventHandler)
   - And 50+ more methods

2. **Connection** - Network connection management
   - TCP connections (Full, Abridged, Obfuscated)
   - Connection state management
   - Proxy support

3. **Sessions** - Session management
   - StringSession - Store session as string
   - StoreSession - Store session in file system
   - MemorySession - Temporary in-memory session

### Event Types

- **NewMessage** - Triggered on new messages
- **CallbackQuery** - Triggered on inline button clicks
- **Album** - Triggered on album/media group messages
- **EditedMessage** - Triggered when messages are edited
- **DeletedMessage** - Triggered when messages are deleted
- **Raw** - Raw Telegram updates

### API Types (via `Api` export)

Complete Telegram API types including:
- Messages (Message, MessageService, MessageEmpty)
- Users (User, UserProfilePhoto, UserStatus)
- Chats (Chat, Channel, ChatForbidden)
- Media (Photo, Document, Video, Audio)
- Requests (SendMessage, GetHistory, UploadFile)
- Updates (UpdateNewMessage, UpdateEditMessage)
- And 1000+ more types

### Utilities

- **utils** - Helper functions for entity handling, file operations, etc.
- **errors** - Error classes for different error scenarios
- **extensions** - Extensions like Logger, BinaryWriter, PromisedWebSockets
- **helpers** - Cryptographic helpers and data conversion
- **password** - Two-factor authentication helpers

## Using with AI

### Integration Approach

1. **Load the JSON documentation:**
   ```javascript
   const gramjsAPI = require('./docs/documentation.json');
   ```

2. **Extract relevant information:**
   - Function signatures with parameters
   - Type definitions
   - Documentation comments
   - Usage examples from comments

3. **Generate integration code:**
   AI can analyze the API structure and generate appropriate code for:
   - Sending messages
   - Receiving messages
   - Handling events
   - File uploads/downloads
   - User authentication
   - Any Telegram operation

### Example Use Cases

**Use Case 1: Send a Message**
AI can find in the docs:
- Class: `TelegramClient`
- Method: `sendMessage(entity, options)`
- Parameters: entity (EntityLike), options (SendMessageParams)
- Returns: Promise<Message>

**Use Case 2: Handle New Messages**
AI can find:
- Event type: `NewMessage`
- Handler registration: `client.addEventHandler(callback, new NewMessage(params))`
- Event properties: message, chatId, senderId, etc.

**Use Case 3: Authentication**
AI can find:
- Method: `client.start(params)`
- Required params: phoneNumber (or botAuthToken), password, phoneCode
- Session management: StringSession, StoreSession

## JSON Structure Example

```json
{
  "name": "TelegramClient",
  "kind": 128,
  "children": [
    {
      "name": "sendMessage",
      "kind": 2048,
      "signatures": [
        {
          "parameters": [
            {
              "name": "entity",
              "type": { /* EntityLike type info */ }
            },
            {
              "name": "sendMessageParams",
              "type": { /* SendMessageParams type info */ }
            }
          ],
          "type": { /* Return type: Promise<Message> */ }
        }
      ],
      "comment": {
        "summary": "Sends a message to the specified entity..."
      }
    }
  ]
}
```

## Key API Patterns

### 1. Client Initialization
```javascript
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

const client = new TelegramClient(
  new StringSession(''),
  apiId,
  apiHash,
  { connectionRetries: 5 }
);
```

### 2. Authentication
```javascript
await client.start({
  phoneNumber: async () => prompt('Phone: '),
  password: async () => prompt('Password: '),
  phoneCode: async () => prompt('Code: '),
  onError: (err) => console.log(err),
});
```

### 3. Sending Messages
```javascript
await client.sendMessage(entity, {
  message: 'Hello!',
  parseMode: 'markdown',
});
```

### 4. Event Handling
```javascript
async function handler(event) {
  console.log(event.message.text);
}
client.addEventHandler(handler, new NewMessage({}));
```

### 5. File Operations
```javascript
// Upload
const file = await client.uploadFile({
  file: './photo.jpg',
  workers: 1,
});

// Send
await client.sendFile(entity, {
  file: file,
  caption: 'Photo caption',
});
```

## Common Integration Tasks

AI can help with:

✅ **Bot Development**
- Respond to messages
- Handle inline buttons
- Process commands
- Send media files

✅ **Automation**
- Scheduled messages
- Auto-replies
- Forward messages
- Group management

✅ **Data Collection**
- Message history retrieval
- User information gathering
- Channel monitoring
- Analytics

✅ **Media Handling**
- Download files
- Upload files
- Send photos/videos
- Process documents

## Type Information

The JSON documentation includes complete TypeScript type information:

- **Intrinsic types**: string, number, boolean, etc.
- **Reference types**: Classes, interfaces, custom types
- **Union types**: Type1 | Type2 | Type3
- **Array types**: Type[]
- **Generic types**: Promise<T>, Array<T>
- **Literal types**: "specific_value"

## Method Categories

### Authentication & Session
- start(), connect(), disconnect()
- signIn(), signUp(), signOut()
- checkAuthorization(), isUserAuthorized()

### Messages
- sendMessage(), editMessage(), deleteMessages()
- getMessages(), iterMessages()
- forwardMessages(), pinMessage(), unpinMessage()
- markAsRead()

### Files & Media
- sendFile(), downloadFile(), uploadFile()
- downloadProfilePhoto(), downloadMedia()
- getStaticMap()

### Chats & Channels
- getDialogs(), iterDialogs()
- getEntity(), getInputEntity()
- getParticipants(), iterParticipants()
- createChannel(), editAdmin()
- joinChannel(), leaveChannel()

### Events
- addEventHandler(), removeEventHandler()
- listEventHandlers()
- Event types: NewMessage, CallbackQuery, Album, etc.

### Utilities
- invoke() - Call raw API methods
- sleep() - Utility sleep function
- Various helper methods

## Error Handling

The documentation includes error types:
- RPCError - Base RPC error
- FloodWaitError - Rate limiting
- PhoneCodeInvalidError - Invalid verification code
- SessionPasswordNeededError - 2FA required
- And many more...

## Best Practices for AI Integration

1. **Always check authentication** before operations
2. **Handle rate limits** and FloodWaitError
3. **Use appropriate session types** (StringSession for serverless, StoreSession for long-running)
4. **Implement error handling** for network issues
5. **Clean up resources** with disconnect() when done

## Documentation Freshness

Generate new documentation after:
- Updating gramjs version
- Making custom modifications
- Before starting new integration project

Command:
```bash
npm run docs:json
```

## Support

For questions about the API:
- Read the generated HTML docs: `./docs/index.html`
- Check the JSON for exact type information
- Refer to examples in the `examples/` directory
- Visit the Telegram group: @GramJSChat

## License

The API documentation is generated from gramjs source code, which is licensed under MIT.
