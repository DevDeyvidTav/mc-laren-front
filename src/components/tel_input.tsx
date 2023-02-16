import { useState } from 'react';

export function TelInput() {
    const [value, setValue] = useState('');
    
    const handleChange = (e: any) => {
        const enteredValue = e.target.value;
        const formattedValue = enteredValue
            .replace(/\D/g, '')
            .substring(0, 11)
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        setValue(formattedValue);
    };

    return (
        <input
            type="tel"
            value={value}
            onChange={handleChange}
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            required
            style={{
                width: '50%',
                padding: '12px',
                fontSize: '16px',
                boxSizing: 'border-box'
            }}
        />
    );
}