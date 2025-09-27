/**
 * Checks if given object has undefined elements
 * @param type 
 * @returns True or False
 */
export const validateRequest = (type: Object, optional?: [string]) => {
    for (const [key, value] of Object.entries(type)) {
        if (optional) {
            if (!optional.includes(key))
                if (value == undefined) return false;
        } else
            if (value == undefined) return false;
    }
    return true;
}

/**
 * Validates permission options
 * @param required 
 * @param actual 
 * @returns 
 */
export const hasRequiredPermissions = (required: any, actual: any): boolean => {
  for (const [key, value] of Object.entries(required)) {
    const actualValue = actual?.[key];

    if (typeof value === "object" && value !== null) {
      if (!hasRequiredPermissions(value, actualValue)) {
        return false;
      }
    } else {
      if (value === true && actualValue !== true) {
        return false;
      }
    }
  }
  return true;
}