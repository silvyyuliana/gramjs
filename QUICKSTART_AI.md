# Quick Start: AI Integration with GramJS

This is a quick reference for AI systems to integrate GramJS into applications.

## Step 1: Generate Documentation

```bash
npm run docs:json
```

**Output:** `./docs/documentation.json` (75MB)

## Step 2: Understanding the JSON Structure

The JSON file contains the complete API in this structure:

```json
{
  "name": "telegram",
  "packageVersion": "2.26.8",
  "children": [
    {
      "name": "TelegramClient",
      "kind": 128,  // 128 = Class
      "children": [
        {
          "name": "sendMessage",
          "kind": 2048,  // 2048 = Method
          "signatures": [{
            "parameters": [...],
            "type": {...},  // Return type
            "comment": {...}  // Documentation
          }]
        }
      ]
    }
  ]
}
```

### Kind Values

- `1` - Project
- `64` - Function
- `128` - Class
- `256` - Interface
- `2048` - Method
- `4` - Namespace
- `1024` - Property
- `32768` - Parameter

## Step 3: Key Classes for Integration

### TelegramClient

The main class for all Telegram operations.

**Location in JSON:** `children` → find where `name === "TelegramClient"`

**Key Methods:**
- `start()` - Connect and authenticate
- `sendMessage()` - Send messages
- `getMessages()` - Retrieve messages
- `addEventHandler()` - Listen for events
- `downloadFile()` - Download files
- `uploadFile()` - Upload files

### Api

All Telegram API types (2000+ classes).

**Location in JSON:** `children` → find where `name === "Api"`

**Contains:**
- Message types
- User types
- Chat types
- Media types
- All Telegram requests

### sessions

Session management classes.

**Available:**
- `StringSession` - For serverless/cloud functions
- `StoreSession` - For persistent file storage
- `MemorySession` - For temporary use

## Step 4: Common Integration Patterns

### Pattern 1: Initialize Client

```javascript
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

const client = new TelegramClient(
  new StringSession(''),  // Empty for first time
  apiId,                   // From my.telegram.org
  apiHash,                 // From my.telegram.org
  { connectionRetries: 5 }
);
```

### Pattern 2: Authenticate

```javascript
await client.start({
  phoneNumber: async () => prompt('Phone?'),
  password: async () => prompt('Password?'),
  phoneCode: async () => prompt('Code?'),
  onError: (err) => console.log(err),
});

// Save session for future use
const sessionString = client.session.save();
```

### Pattern 3: Send Message

```javascript
await client.sendMessage('username', {
  message: 'Hello from AI!',
});
```

### Pattern 4: Handle Events

```javascript
const { NewMessage } = require('telegram/events');

async function handler(event) {
  console.log('New message:', event.message.text);
}

client.addEventHandler(handler, new NewMessage({}));
```

### Pattern 5: Send Files

```javascript
await client.sendFile('username', {
  file: './document.pdf',
  caption: 'Here is the file',
});
```

## Step 5: Parsing the JSON

### Extract All Methods of a Class

```javascript
const docs = require('./docs/documentation.json');

// Find TelegramClient
const telegramClient = docs.children.find(
  c => c.name === 'TelegramClient'
);

// Get all methods
const methods = telegramClient.children.filter(
  c => c.kind === 2048  // Method kind
);

// For each method, extract signature
methods.forEach(method => {
  const sig = method.signatures[0];
  console.log(`${method.name}:`);
  console.log('  Parameters:', sig.parameters.map(p => p.name));
  console.log('  Returns:', sig.type);
});
```

### Extract Parameter Types

```javascript
const sendMessage = methods.find(m => m.name === 'sendMessage');
const params = sendMessage.signatures[0].parameters;

params.forEach(param => {
  console.log(`${param.name}:`, param.type);
  // param.type contains full type information
  // Can be: intrinsic, reference, union, literal, etc.
});
```

### Extract Documentation

```javascript
const sig = sendMessage.signatures[0];
if (sig.comment && sig.comment.summary) {
  const docs = sig.comment.summary
    .map(s => s.text)
    .join('');
  console.log('Documentation:', docs);
}
```

## Step 6: Type Information

Types are represented as objects:

### Intrinsic Types
```json
{ "type": "intrinsic", "name": "string" }
{ "type": "intrinsic", "name": "number" }
{ "type": "intrinsic", "name": "boolean" }
```

### Reference Types
```json
{
  "type": "reference",
  "target": 12345,  // ID of referenced type
  "name": "Message"
}
```

### Union Types
```json
{
  "type": "union",
  "types": [
    { "type": "intrinsic", "name": "string" },
    { "type": "intrinsic", "name": "number" }
  ]
}
```

### Generic Types
```json
{
  "type": "reference",
  "name": "Promise",
  "typeArguments": [
    { "type": "reference", "name": "Message" }
  ]
}
```

## Step 7: AI Code Generation Tips

### Generate Client Initialization
1. Always include error handling
2. Use StringSession for stateless apps
3. Use StoreSession for persistent apps
4. Save session string after authentication

### Generate Message Sending
1. Check if authenticated first
2. Handle entity resolution (username/ID)
3. Support markdown/HTML parsing
4. Include error handling for FloodWaitError

### Generate Event Handlers
1. Import correct event type
2. Add type checking in handler
3. Handle async operations properly
4. Remove handlers when done

### Generate File Operations
1. Check file size limits
2. Use workers for large files
3. Handle progress callbacks
4. Include timeout handling

## Step 8: Error Handling

Common errors to handle:

```javascript
try {
  await client.sendMessage(...);
} catch (error) {
  if (error.message.includes('FLOOD_WAIT')) {
    // Rate limited - wait and retry
  } else if (error.message.includes('AUTH_KEY')) {
    // Re-authenticate needed
  } else if (error.message.includes('USER_DEACTIVATED')) {
    // Account banned
  }
}
```

## Step 9: Best Practices

✅ **DO:**
- Check `client.connected` before operations
- Save session after authentication
- Use try-catch for all operations
- Handle rate limits gracefully
- Clean up with `client.disconnect()`

❌ **DON'T:**
- Hard-code credentials
- Ignore rate limits
- Leave connections open
- Send too many requests rapidly
- Store sessions insecurely

## Step 10: Testing Generated Code

```javascript
// Minimal test
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

(async () => {
  const client = new TelegramClient(
    new StringSession(''),
    API_ID,
    API_HASH,
    {}
  );
  
  await client.start({
    phoneNumber: () => PHONE,
    password: () => PASSWORD,
    phoneCode: () => CODE,
  });
  
  console.log('Connected!');
  console.log('Session:', client.session.save());
  
  await client.disconnect();
})();
```

## Resources

- **Full Guide:** `AI_INTEGRATION_GUIDE.md`
- **Documentation Guide:** `GENERATING_DOCS.md`
- **Example Parser:** `examples/parse-docs.js`
- **API Docs:** `./docs/index.html` (after running `npm run docs`)
- **JSON Docs:** `./docs/documentation.json` (after running `npm run docs:json`)

## Support

- GitHub: https://github.com/gram-js/gramjs
- Telegram: @GramJSChat
- Issues: https://github.com/gram-js/gramjs/issues
