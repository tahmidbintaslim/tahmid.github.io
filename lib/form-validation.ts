export interface ValidationRule {
    validate: (value: string) => boolean;
    message: string;
}

export interface FieldValidation {
    [key: string]: ValidationRule[];
}

export const VALIDATION_RULES = {
    required: (fieldName: string): ValidationRule => ({
        validate: (value: string) => value.trim().length > 0,
        message: `${fieldName} is required`,
    }),
    email: (): ValidationRule => ({
        validate: (value: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid email address",
    }),
    minLength: (length: number): ValidationRule => ({
        validate: (value: string) => value.length >= length,
        message: `Must be at least ${length} characters`,
    }),
    maxLength: (length: number): ValidationRule => ({
        validate: (value: string) => value.length <= length,
        message: `Must not exceed ${length} characters`,
    }),
    phone: (): ValidationRule => ({
        validate: (value: string) =>
            /^[\d\s\-\+\(\)]{10,}$/.test(value.replace(/\s/g, "")),
        message: "Please enter a valid phone number",
    }),
    url: (): ValidationRule => ({
        validate: (value: string) => {
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        },
        message: "Please enter a valid URL",
    }),
};

export interface FormErrors {
    [key: string]: string | undefined;
}

export function validateField(
    value: string,
    rules: ValidationRule[]
): string | undefined {
    for (const rule of rules) {
        if (!rule.validate(value)) {
            return rule.message;
        }
    }
    return undefined;
}

export function validateForm(
    formData: Record<string, string>,
    validation: FieldValidation
): FormErrors {
    const errors: FormErrors = {};

    for (const [field, rules] of Object.entries(validation)) {
        const error = validateField(formData[field] || "", rules);
        if (error) {
            errors[field] = error;
        }
    }

    return errors;
}
