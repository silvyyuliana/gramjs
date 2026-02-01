# Generating Documentation for AI Integration

This guide explains how to generate comprehensive API documentation for gramjs that can be used by AI systems to understand and integrate the library.

## Quick Start

Generate all documentation formats:

```bash
npm run docs:all
```

Or generate specific formats:

```bash
# Generate HTML documentation (human-readable)
npm run docs

# Generate JSON documentation (for AI/machine consumption)
npm run docs:json

# Generate Markdown documentation
npm run docs:md
```

## Output Formats

### 1. HTML Documentation (`./docs/`)

Human-readable documentation with:
- Interactive navigation
- Full API reference
- Type hierarchies
- Cross-references between types

**Best for:** Manual browsing and learning

### 2. JSON Documentation (`./docs/documentation.json`)

Machine-readable JSON format containing:
- Complete type information
- Function signatures with parameters
- Class hierarchies and inheritance
- Interface definitions
- Inline documentation comments

**Best for:** 
- AI/LLM integration
- Automated code generation
- API analysis tools
- Custom documentation processing

### 3. Markdown Documentation (`./docs-md/`)

Markdown format suitable for:
- Documentation websites
- GitHub wikis
- Static site generators

## JSON Structure for AI Integration

The `documentation.json` file follows TypeDoc's JSON schema and includes:

```json
{
  "schemaVersion": "2.0",
  "id": 0,
  "name": "telegram",
  "variant": "project",
  "kind": 1,
  "children": [
    {
      "name": "TelegramClient",
      "kind": 128,  // Class
      "comment": {
        "summary": [/* Description */],
        "blockTags": [/* @param, @returns, etc. */]
      },
      "signatures": [/* Method signatures */],
      "children": [/* Properties and methods */]
    }
    // ... more exports
  ]
}
```

### Key Properties:

- **`kind`**: Type of symbol (1=Module, 64=Function, 128=Class, 256=Interface, etc.)
- **`comment`**: Documentation comments with summary and block tags
- **`signatures`**: Function/method signatures with parameters and return types
- **`type`**: Detailed type information (intrinsic, reference, union, etc.)
- **`children`**: Nested declarations (methods, properties, etc.)

## Using Documentation with AI

### For Code Generation

The JSON documentation provides AI systems with:
1. **Complete API surface**: All public classes, functions, and types
2. **Type information**: Exact parameter and return types
3. **Documentation**: Inline comments explaining functionality
4. **Relationships**: Inheritance, implementations, and dependencies

### Example AI Prompts

1. **Integration**: "Using the gramjs documentation, integrate Telegram messaging into my Node.js app"
2. **Code generation**: "Based on the TelegramClient API, write code to send a message with an image"
3. **Troubleshooting**: "Explain the difference between StringSession and StoreSession based on the docs"

### Parsing the JSON

```javascript
const docs = require('./docs/documentation.json');

// Find all exported classes
const classes = docs.children
  .filter(child => child.kind === 128);

// Get TelegramClient methods
const telegramClient = docs.children
  .find(child => child.name === 'TelegramClient');
const methods = telegramClient.children
  .filter(child => child.kind === 2048); // Methods
```

## Documentation Coverage

The generated documentation includes:

✅ **Core Client**
- `TelegramClient` - Main client class
- `Connection` - Network connections
- `Logger` - Logging utilities

✅ **Sessions**
- `StringSession` - String-based session storage
- `StoreSession` - File-based session storage
- `MemorySession` - In-memory sessions

✅ **Events**
- `NewMessage` - New message events
- `CallbackQuery` - Button callback events
- `Album` - Album/media group events
- `EditedMessage` - Message edit events
- `DeletedMessage` - Message deletion events

✅ **API Types**
- `Api` - Complete Telegram API types
- All TL (Type Language) objects
- Request and response types

✅ **Utilities**
- `utils` - Helper functions
- `errors` - Error classes
- `extensions` - Extensions and helpers
- `helpers` - Cryptographic and data helpers

✅ **Client Methods**
- Authentication
- Message sending/receiving
- File uploads/downloads
- User/chat management
- And much more...

## Configuration

Documentation generation is configured in `type_doc.js`:

```javascript
module.exports = {
  entryPoints: ["./gramjs/index.ts"],
  out: "./docs",
  excludePrivate: true,
  skipErrorChecking: true,
  // ... more options
};
```

### Key Configuration Options:

- **`entryPoints`**: Source files to document (currently `gramjs/index.ts`)
- **`excludePrivate`**: Skip private members (enabled)
- **`excludeProtected`**: Skip protected members (disabled to show more API)
- **`skipErrorChecking`**: Continue despite TypeScript errors

## File Sizes

Typical documentation sizes:
- **HTML**: ~5-10 MB (compressed web assets)
- **JSON**: ~50-100 MB (complete type information)
- **Markdown**: ~10-20 MB (text-based documentation)

## Requirements

- Node.js 12+
- TypeDoc (installed via devDependencies)
- TypeScript (installed via devDependencies)

## Updating Documentation

After making changes to the codebase:

1. Run documentation generation:
   ```bash
   npm run docs:all
   ```

2. Review generated documentation:
   ```bash
   # Open in browser
   open docs/index.html
   
   # Or on Linux
   xdg-open docs/index.html
   ```

3. The JSON file is automatically updated and ready for AI consumption

## Notes

- Documentation is excluded from git (see `.gitignore`)
- Generate fresh documentation for each release
- JSON format is stable across TypeDoc versions
- HTML format may change with TypeDoc updates

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors during generation:
- Documentation will still be generated (thanks to `skipErrorChecking: true`)
- Warnings about missing links are normal and don't affect the output

### Missing Documentation

Some internal types may not be documented. This is by design to focus on the public API that users interact with.

### Large File Sizes

The JSON file is large because it contains:
- Complete type information for all Telegram API types
- Full inheritance chains
- Source file locations
- All documentation comments

This is necessary for comprehensive AI integration.
