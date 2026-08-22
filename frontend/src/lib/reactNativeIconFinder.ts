export const POPULAR_RN_ICONS = [
  { name: 'home', set: 'Ionicons', importPath: 'react-native-vector-icons/Ionicons' },
  { name: 'settings', set: 'Ionicons', importPath: 'react-native-vector-icons/Ionicons' },
  { name: 'person', set: 'Ionicons', importPath: 'react-native-vector-icons/Ionicons' },
  { name: 'search', set: 'MaterialIcons', importPath: 'react-native-vector-icons/MaterialIcons' },
  { name: 'favorite', set: 'MaterialIcons', importPath: 'react-native-vector-icons/MaterialIcons' },
  { name: 'lock', set: 'FontAwesome', importPath: 'react-native-vector-icons/FontAwesome' },
];

export function searchRnIcons(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return POPULAR_RN_ICONS;
  return POPULAR_RN_ICONS.filter((i) => i.name.includes(q) || i.set.toLowerCase().includes(q));
}
