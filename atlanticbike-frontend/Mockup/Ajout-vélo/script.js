window.AtlanticBikeUI.renderNavbar(
  document.querySelector('[data-navbar-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'admin-bike',
  },
);

const categoryPrices = {
  VTC: '29€',
  VAE: '45€',
  Ville: '24€',
  Enfant: '16€',
  Cargo: '55€',
};

const summaryBrand = document.getElementById('summaryBrand');
const summaryName = document.getElementById('summaryName');
const summaryCategory = document.getElementById('summaryCategory');
const summaryPrice = document.getElementById('summaryPrice');
const summaryStock = document.getElementById('summaryStock');
const summaryTag = document.getElementById('summaryTag');

const bikeBrand = document.getElementById('bikeBrand');
const bikeName = document.getElementById('bikeName');
const bikeCategory = document.getElementById('bikeCategory');
const bikeDayPrice = document.getElementById('bikeDayPrice');
const bikeInitialStock = document.getElementById('bikeInitialStock');
const bikePrimaryTag = document.getElementById('bikePrimaryTag');

function syncSummary() {
  summaryBrand.textContent = bikeBrand.value || 'Riverside';
  summaryName.textContent = bikeName.value || 'Touring 500';
  summaryCategory.textContent = bikeCategory.value || 'VTC';
  summaryPrice.textContent = bikeDayPrice.value || '29€';
  summaryStock.textContent = bikeInitialStock.value || '3';
  summaryTag.textContent = bikePrimaryTag.value || 'location';
}

function updatePriceFromCategory() {
  const value = categoryPrices[bikeCategory.value];
  if (value) {
    bikeDayPrice.value = value;
    syncSummary();
  }
}

bikeBrand?.addEventListener('input', syncSummary);
bikeName?.addEventListener('input', syncSummary);
bikeCategory?.addEventListener('change', updatePriceFromCategory);
bikeDayPrice?.addEventListener('input', syncSummary);
bikeInitialStock?.addEventListener('input', syncSummary);
bikePrimaryTag?.addEventListener('change', syncSummary);

if (bikeCategory && bikeDayPrice && !bikeDayPrice.value) {
  bikeDayPrice.value = categoryPrices[bikeCategory.value] || '29€';
}

syncSummary();

window.AtlanticBikeUI.renderFooter(
  document.querySelector('[data-footer-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'admin-bike',
  },
);
