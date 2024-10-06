const hasFieldInput = (value: string) => !!value && value !== "";

export const hasFieldsInput = (values: string[]) => values.every(hasFieldInput);