window.AtlanticBikeUI.renderNavbar(
  document.querySelector('[data-navbar-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'contact',
  },
);

const contactForm = document.getElementById('contactForm');

function setFieldError(fieldId, message) {
  const errorNode = document.querySelector(`[data-error-for="${fieldId}"]`);
  if (errorNode) {
    errorNode.textContent = message;
  }
}

function clearFieldErrors() {
  document.querySelectorAll('.ab-contact-field__error').forEach((node) => {
    node.textContent = '';
  });
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFieldErrors();

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const termsAccepted = document.getElementById('termsAccepted');

  let hasError = false;

  if (!firstName.value.trim()) {
    setFieldError('firstName', 'Veuillez renseigner votre prénom.');
    hasError = true;
  }

  if (!lastName.value.trim()) {
    setFieldError('lastName', 'Veuillez renseigner votre nom.');
    hasError = true;
  }

  if (!email.value.trim()) {
    setFieldError('email', 'Veuillez renseigner votre email.');
    hasError = true;
  }

  if (!message.value.trim()) {
    setFieldError('message', 'Veuillez écrire votre message.');
    hasError = true;
  }

  if (!termsAccepted.checked) {
    alert(
      'Veuillez accepter les conditions générales avant d’envoyer votre message.',
    );
    hasError = true;
  }

  if (hasError) return;

  alert('Message envoyé (simulation mockup).');
});

window.AtlanticBikeUI.renderFooter(
  document.querySelector('[data-footer-root]'),
  {
    assetBase: '../Navbar/design/Assets',
    currentPage: 'contact',
  },
);
