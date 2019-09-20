export function openExternalLink(url) {
    const win = window.open(url, '_blank');
    win.focus();
}