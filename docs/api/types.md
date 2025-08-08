# Types

## ESMitterEventName

Represents the name of an event in ESMitter. This can be a string or a symbol:

```typescript
const STRING_EVENT_NAME: ESMitterEventName = "dataReceived"; // <- most common usage
const SYMBOL_EVENT_NAME: ESMitterEventName = Symbol("dataReceived");
```

## ESMitterEvent

Describes an event, its arguments, and context. To be used when extending the ESMitter class.

```typescript
type SuccessEvent = ESMitterEvent<
  [{ foo: string; bar: string }], // <- arguments passed to the listener
  { source: string } // <- context for the listener
>;
```

## ESMitterEvents

Defines a mapping of event names to their corresponding event handler signatures. Used for type-safe
event registration and emission in ESMitter.

```typescript
interface MyEvents extends ESMitterEvents {
  success: ESMitterEvent<[{ foo: string; bar: string }]>;
  error: ESMitterEvent<[number, string]>;
}

class MyClass extends ESMitter<MyEvents> {}
```
