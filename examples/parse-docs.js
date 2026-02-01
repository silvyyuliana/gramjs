#!/usr/bin/env node
/**
 * Example: How to parse the generated JSON documentation for AI integration
 * 
 * This script demonstrates how to load and extract useful information
 * from the documentation.json file for AI/automated code generation.
 */

const fs = require('fs');
const path = require('path');

// Load the documentation
const docsPath = path.join(__dirname, '..', 'docs', 'documentation.json');

if (!fs.existsSync(docsPath)) {
    console.error('Error: Documentation not found!');
    console.error('Please run: npm run docs:json');
    process.exit(1);
}

console.log('Loading documentation...');
const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

console.log('\n=== GramJS API Documentation ===');
console.log(`Package: ${docs.name}`);
console.log(`Version: ${docs.packageVersion || 'N/A'}`);
console.log(`Schema Version: ${docs.schemaVersion}`);

// Helper function to get kind name
function getKindName(kind) {
    const kinds = {
        1: "Project", 2: "Module", 4: "Namespace", 8: "Enum",
        16: "EnumMember", 32: "Variable", 64: "Function", 128: "Class",
        256: "Interface", 512: "Constructor", 1024: "Property",
        2048: "Method", 4096: "CallSignature", 32768: "Parameter",
        65536: "TypeLiteral", 2097152: "TypeAlias"
    };
    return kinds[kind] || `Unknown(${kind})`;
}

// Find TelegramClient class
function findByName(items, name) {
    for (const item of items) {
        if (item.name === name) return item;
        if (item.children) {
            const found = findByName(item.children, name);
            if (found) return found;
        }
    }
    return null;
}

const telegramClient = findByName(docs.children, 'TelegramClient');

if (telegramClient) {
    console.log('\n=== TelegramClient Class ===');
    console.log(`Kind: ${getKindName(telegramClient.kind)}`);
    
    // Find methods
    const methods = telegramClient.children.filter(c => c.kind === 2048);
    console.log(`\nPublic Methods (${methods.length} total):`);
    
    // Show first 20 methods
    methods.slice(0, 20).forEach(method => {
        const signature = method.signatures ? method.signatures[0] : null;
        if (signature) {
            const params = signature.parameters || [];
            const paramStr = params.map(p => p.name).join(', ');
            console.log(`  - ${method.name}(${paramStr})`);
            
            // Show comment if available
            if (signature.comment && signature.comment.summary) {
                const summary = signature.comment.summary
                    .map(s => s.text)
                    .join('')
                    .split('\n')[0]; // First line only
                if (summary) {
                    console.log(`    ${summary.substring(0, 80)}${summary.length > 80 ? '...' : ''}`);
                }
            }
        }
    });
    
    if (methods.length > 20) {
        console.log(`  ... and ${methods.length - 20} more methods`);
    }
}

// Show top-level exports
console.log('\n=== Top-Level Exports ===');
docs.children.forEach(child => {
    console.log(`- ${child.name} (${getKindName(child.kind)})`);
});

// Example: Find all classes
function countByKind(items, kind, results = []) {
    for (const item of items) {
        if (item.kind === kind) {
            results.push(item);
        }
        if (item.children) {
            countByKind(item.children, kind, results);
        }
    }
    return results;
}

const allClasses = countByKind([docs], 128);
console.log(`\n=== Statistics ===`);
console.log(`Total Classes: ${allClasses.length}`);
console.log(`Total Methods: ${countByKind([docs], 2048).length}`);
console.log(`Total Functions: ${countByKind([docs], 64).length}`);
console.log(`Total Interfaces: ${countByKind([docs], 256).length}`);

// Example: Extract method information for AI
console.log('\n=== Example: Extract sendMessage Method Info ===');
const sendMessage = telegramClient?.children.find(c => c.name === 'sendMessage');
if (sendMessage && sendMessage.signatures && sendMessage.signatures[0]) {
    const sig = sendMessage.signatures[0];
    
    console.log('Method Signature:');
    console.log(`  Name: ${sendMessage.name}`);
    console.log('  Parameters:');
    
    (sig.parameters || []).forEach(param => {
        console.log(`    - ${param.name}: ${JSON.stringify(param.type).substring(0, 50)}...`);
    });
    
    if (sig.type) {
        console.log(`  Returns: ${JSON.stringify(sig.type).substring(0, 80)}...`);
    }
    
    if (sig.comment) {
        console.log('  Description:');
        if (sig.comment.summary) {
            sig.comment.summary.forEach(s => {
                if (s.text) {
                    console.log(`    ${s.text.substring(0, 200)}`);
                }
            });
        }
    }
}

console.log('\n=== AI Integration Tips ===');
console.log('1. Use this JSON to understand the complete API surface');
console.log('2. Extract type information for parameter validation');
console.log('3. Parse comments for usage examples and descriptions');
console.log('4. Generate wrapper code based on method signatures');
console.log('5. Build intelligent code completion from the type data');

console.log('\n=== Next Steps ===');
console.log('1. Parse the JSON in your AI system');
console.log('2. Extract relevant classes and methods');
console.log('3. Generate integration code automatically');
console.log('4. Use type information for validation');

console.log('\nFor more information, see:');
console.log('- AI_INTEGRATION_GUIDE.md');
console.log('- GENERATING_DOCS.md');
