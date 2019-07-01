/**
 * Defines a recursive menu item
 */
export class CmsMenuItem {
  title: string;
  path: string;
  children?: Array<CmsMenuItem>;
}
