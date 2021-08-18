/**
 * 页面刷新时从localStorage加载主题
 */
export function initTheme(): void {
  const mode = localStorage.getItem('data-color-mode');
  const light = localStorage.getItem('data-light-theme');
  const dark = localStorage.getItem('data-dark-theme');
  mode && document.querySelector('html').setAttribute('data-color-mode', mode);
  light && document.querySelector('html').setAttribute('data-light-theme', light);
  dark && document.querySelector('html').setAttribute('data-dark-theme', dark);
}

/**
 * 设置主题
 * @param theme
 */
export function setTheme(theme: string): void {
  document.querySelector('html').setAttribute('data-color-mode', theme);
  document.querySelector('html').setAttribute('data-light-theme', 'light');
  document.querySelector('html').setAttribute('data-dark-theme', 'dark_dimmed');
  localStorage.setItem('data-color-mode', theme);
  localStorage.setItem('data-light-theme', 'light');
  localStorage.setItem('data-dark-theme', 'dark_dimmed');
}
