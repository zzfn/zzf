/**
 * 页面刷新时从localStorage加载主题
 */
export function initTheme(): void {
  const mode = localStorage.getItem('data-color-mode');
  mode && document.querySelector('html')?.setAttribute('data-color-mode', mode);
}

/**
 * 设置主题
 * @param theme
 */
export function setTheme(theme: string): void {
  document.querySelector('html')?.setAttribute('data-color-mode', theme);
  localStorage.setItem('data-color-mode', theme);
}
