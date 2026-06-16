type SchemaFields = Record<string, { default?: string | number | boolean }>;

export function getDefaults(schema: { fields: SchemaFields }): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const [key, field] of Object.entries(schema.fields)) {
    defaults[key] = String(field.default ?? '');
  }
  return defaults;
}

export function mergeComponentContent(
  schema: { fields: SchemaFields },
  apiData?: Record<string, string> | null,
): Record<string, string> {
  return { ...getDefaults(schema), ...(apiData ?? {}) };
}
