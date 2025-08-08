# eventNames()

Returns an array listing the event names for which the emitter has registered listeners.

## Example

```typescript
const events = instance.eventNames();
// events: ["foo", "bar"]
```

## Returns

| Type                    | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| Array<string \| symbol> | An array of event names (strings or symbols) with registered listeners. |

## Notes

- If no listeners are registered, an empty array is returned.
