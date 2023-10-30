import { useState } from 'react';

export function useInput<T>(defaultValue: T) {
    const [value, setValue] = useState<T>(defaultValue);

    const onChange = event => setValue(event.target.value);

    return {
        value,
        onChange,
    };
}