window.AtlanticBikeUI.renderNavbar(
  document.querySelector('[data-navbar-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'maps',
  },
);

document.querySelectorAll('.ab-map-faq-item__trigger').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.ab-map-faq-item');
    item.classList.toggle('is-open');
  });
});

window.AtlanticBikeUI.renderFooter(
  document.querySelector('[data-footer-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'maps',
  },
);
