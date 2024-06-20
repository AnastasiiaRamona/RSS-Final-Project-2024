import { API } from 'nouislider';

export interface SliderElement extends HTMLElement {
  noUiSlider: API;
}
export interface BreadcrumbsInfo {
  parentCategory: Category | null;
  category: Category;
}
export interface CategoryMap {
  [key: string]: CategoryNode;
}
interface CategoryNode {
  id: string;
  name: string;
  parent?: string;
  children: CategoryMap;
}
interface Category {
  id: string;
  name: { 'en-US': string };
}
