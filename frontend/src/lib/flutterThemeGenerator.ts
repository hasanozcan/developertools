export function generateFlutterColorScheme(primaryHex: string, isDark = false): string {
  return `ThemeData(
  useMaterial3: true,
  brightness: Brightness.${isDark ? 'dark' : 'light'},
  colorScheme: ColorScheme.fromSeed(
    seedColor: const Color(0xFF${primaryHex.replace('#', '').toUpperCase()}),
    brightness: Brightness.${isDark ? 'dark' : 'light'},
  ),
)`;
}
