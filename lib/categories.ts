export type Category = 'לוגיסטיקה' | 'טיול' | 'סדנה' | 'ארוחה' | 'תוכן משפחתי'

export const CATEGORY_STYLES: Record<Category, string> = {
  'לוגיסטיקה': 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100',
  'טיול': 'bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-50',
  'סדנה': 'bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-50',
  'ארוחה': 'bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-50',
  'תוכן משפחתי': 'bg-pink-200 dark:bg-pink-700 text-pink-900 dark:text-pink-50',
}
