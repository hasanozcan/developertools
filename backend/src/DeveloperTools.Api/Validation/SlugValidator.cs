namespace DeveloperTools.Api.Validation;

public static class SlugValidator
{
    public static bool IsValid(string? value, int maxLength)
    {
        if (string.IsNullOrEmpty(value) || value.Length > maxLength || value[0] == '-' || value[^1] == '-')
            return false;

        var previousWasHyphen = false;
        foreach (var character in value)
        {
            if (character is >= 'a' and <= 'z' or >= '0' and <= '9')
            {
                previousWasHyphen = false;
                continue;
            }

            if (character == '-' && !previousWasHyphen)
            {
                previousWasHyphen = true;
                continue;
            }

            return false;
        }

        return true;
    }
}
