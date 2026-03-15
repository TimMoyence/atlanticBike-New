window.AtlanticBikeUI.renderNavbar(
  document.querySelector('[data-navbar-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'connexion',
  },
);

const loginForm = document.getElementById('adminLoginForm');
const loginEmail = document.getElementById('adminLoginEmail');
const loginPassword = document.getElementById('adminLoginPassword');
const togglePassword = document.getElementById('adminTogglePassword');

function setFieldError(fieldId, message) {
  const errorNode = document.querySelector(`[data-error-for="${fieldId}"]`);
  if (errorNode) {
    errorNode.textContent = message;
  }
}

function clearFieldErrors() {
  document.querySelectorAll('.ab-admin-login-field__error').forEach((node) => {
    node.textContent = '';
  });
}

togglePassword?.addEventListener('click', () => {
  const isPassword = loginPassword.type === 'password';
  loginPassword.type = isPassword ? 'text' : 'password';
  togglePassword.textContent = isPassword ? 'Masquer' : 'Voir';
});

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFieldErrors();

  let hasError = false;

  if (!loginEmail.value.trim()) {
    setFieldError('adminLoginEmail', 'Veuillez renseigner votre email.');
    hasError = true;
  }

  if (!loginPassword.value.trim()) {
    setFieldError(
      'adminLoginPassword',
      'Veuillez renseigner votre mot de passe.',
    );
    hasError = true;
  }

  if (hasError) return;

  window.location.href = '../admin-pages/index.html';
});

window.AtlanticBikeUI.renderFooter(
  document.querySelector('[data-footer-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'connexion',
  },
);
