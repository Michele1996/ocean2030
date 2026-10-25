// Ocean2030 people portraits — robust local-first loader.
// Attach the image before setting src. Detached lazy images might not load
// in all browsers, which previously kept Kevin and Christine's photos hidden.
document.querySelectorAll('[data-photo]').forEach((node) => {
  const local = node.getAttribute('data-photo');
  const remote = node.getAttribute('data-photo-remote');
  if (!local || node.querySelector('img[data-managed-photo]')) return;

  const dot = local.lastIndexOf('.');
  const basename = dot < 0 ? local : local.substring(0, dot);
  const preferredExt = dot < 0 ? '' : local.substring(dot);
  const candidates = [local];
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
    const candidate = basename + ext;
    if (!candidates.includes(candidate)) candidates.push(candidate);
  }
  if (remote) candidates.push(remote);

  const image = document.createElement('img');
  image.setAttribute('data-managed-photo', '');
  image.alt = node.getAttribute('aria-label') || 'Portrait';
  image.decoding = 'async';
  // Photos are tiny; eager loading ensures all portraits are populated.
  image.loading = 'eager';
  image.referrerPolicy = 'no-referrer';
  image.style.visibility = 'hidden';

  let next = 0;
  image.onload = () => {
    image.style.visibility = 'visible';
    node.classList.add('has-photo');
  };
  image.onerror = () => {
    node.classList.remove('has-photo');
    image.style.visibility = 'hidden';
    showNext();
  };
  function showNext() {
    if (next >= candidates.length) {
      image.remove(); // Keep initials visible if no photo is available.
      return;
    }
    image.src = candidates[next++];
  }
  node.appendChild(image);
  showNext();
});
// Prefer locally saved NOAA scene photography after running download_images.py.
document.querySelectorAll('img[data-local]').forEach(image => {
  const test = new Image();
  test.onload = () => {image.src = image.dataset.local;};
  test.src = image.dataset.local;
  image.onerror = () => {image.style.opacity = '0';};
});
const icraLogo = document.querySelector('.official-icra-logo');
if(icraLogo){ icraLogo.addEventListener('error', () => {icraLogo.hidden=true;const sibling=icraLogo.nextElementSibling;if(sibling)sibling.hidden=false;}); }
const menuButton=document.querySelector('.nav-toggle');
if(menuButton){menuButton.addEventListener('click',()=>menuButton.setAttribute('aria-expanded',String(menuButton.classList.contains('active'))));}
