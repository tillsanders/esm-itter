# listenerCount()

Returns the number of listeners registered for a given event, or the total number of listeners across all events when called without an argument.

## Example

```typescript
const count = instance.listenerCount("foo");
// count: 2

const total = instance.listenerCount();
// total: 5
```

## Parameters

| Parameter | Type             | Description                                                                                                                                                      |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event     | string \| symbol | _(Optional)_ The event name. Expects an [ESMitterEventName](/api/types#esmittereventname). When omitted, the total listener count across all events is returned. |

## Returns

| Type   | Description                                                                                               |
| ------ | --------------------------------------------------------------------------------------------------------- |
| number | The number of listeners registered for the event, or the total across all events if no argument is given. |

## Notes

- If no listeners are registered for the event, `0` is returned.
- When called without an argument, `0` is returned if no listeners are registered for any event.
