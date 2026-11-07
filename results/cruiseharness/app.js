const products = [
  { id: 1, name: 'Moss Notes', description: 'A quieter notebook for your everyday ideas.', category: 'Productivity', icon: '✳', votes: 128 },
  { id: 2, name: 'Orbit Table', description: 'Plan a week of meals with whatever is in your kitchen.', category: 'Food & home', icon: '◒', votes: 96 },
  { id: 3, name: 'Tiny Trails', description: 'Discover little walking adventures close to home.', category: 'Outdoors', icon: '↗', votes: 74 },
  { id: 4, name: 'Pixel Post', description: 'Turn a small creative win into a digital postcard.', category: 'Design', icon: '▧', votes: 53 }
];
const voted = new Set();
const list = document.querySelector('#products');
const status = document.querySelector('#status');

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function render() {
  list.replaceChildren();
  [...products].sort((a, b) => b.votes - a.votes || a.id - b.id).forEach(product => {
    const row = element('article', 'product');
    const icon = element('span', 'icon', product.icon);
    icon.setAttribute('aria-hidden', 'true');
    const details = element('div', 'details');
    details.append(element('h3', '', product.name), element('p', '', product.description), element('span', 'tag', product.category));
    const vote = element('button', 'vote');
    vote.type = 'button';
    vote.setAttribute('aria-pressed', String(voted.has(product.id)));
    vote.setAttribute('aria-label', `${voted.has(product.id) ? 'Remove vote for' : 'Upvote'} ${product.name}, ${product.votes} votes`);
    vote.append(element('span', '', '▲'), element('span', '', String(product.votes)));
    vote.addEventListener('click', () => {
      const wasVoted = voted.has(product.id);
      product.votes += wasVoted ? -1 : 1;
      wasVoted ? voted.delete(product.id) : voted.add(product.id);
      render();
      list.querySelector(`[data-id="${product.id}"]`).focus();
      status.textContent = `${wasVoted ? 'Vote removed from' : 'Voted for'} ${product.name}.`;
    });
    vote.dataset.id = product.id;
    row.append(icon, details, vote);
    list.append(row);
  });
}

let submittedProduct = null;
document.querySelector('#submission').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const description = form.elements.description.value.trim();
  if (!name || !description) {
    status.textContent = 'Enter a product name and description.';
    (!name ? form.elements.name : form.elements.description).focus();
    return;
  }
  products.push({ id: products.length + 1, name, description, category: 'Community submission', icon: '◇', votes: 0 });
  submittedProduct = { name, description };
  document.querySelector('#submission-confirmation').hidden = false;
  document.querySelector('#submission-message').textContent = `${name} added for free to this local demo. Submission is complete; sponsorship is optional.`;
  render();
  form.reset();
  status.textContent = `${name} added for free to this local demo.`;
});
const sponsorToggle = document.querySelector('#sponsor-toggle');
const sponsorInquiry = document.querySelector('#sponsor-inquiry');
sponsorToggle.addEventListener('click', () => {
  const opening = sponsorInquiry.hidden;
  sponsorInquiry.hidden = !opening;
  sponsorToggle.setAttribute('aria-expanded', String(opening));
  sponsorToggle.textContent = opening ? 'Close sponsorship inquiry' : 'Open sponsorship inquiry';
  if (opening) document.querySelector('#sponsor-company').focus();
});
const sponsorship = document.querySelector('#sponsorship');
function localDateValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function campaignSchedule(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const start = new Date(0);
  start.setFullYear(year, month - 1, day);
  start.setHours(12, 0, 0, 0);
  if (localDateValue(start) !== value) return null;
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return `${value} through ${localDateValue(end)}`;
}
sponsorship.elements.start.value = localDateValue(new Date());
const previewFields = ['product', 'description', 'cta'];
function updatePlacementPreview() {
  const schedule = campaignSchedule(sponsorship.elements.start.value);
  document.querySelector('#preview-schedule').textContent = schedule
    ? `Illustrative seven-day run: ${schedule} · $49 total.`
    : 'Choose a valid start date to preview the seven-day run.';
  previewFields.forEach(field => {
    document.querySelector(`#preview-${field}`).textContent = sponsorship.elements[field].value.trim() || {
      product: 'Your fictional product', description: 'Your fictional short description.', cta: 'Explore product'
    }[field];
  });
}
const inquiryFields = ['company', 'email', ...previewFields, 'start'];
let inquirySnapshot = null;
let inquirySnapshotInvalidated = false;
document.querySelector('#submission-featured').addEventListener('click', () => {
  if (!submittedProduct) return;
  sponsorship.elements.product.value = submittedProduct.name;
  sponsorship.elements.description.value = submittedProduct.description;
  inquirySnapshotInvalidated = true;
  updatePlacementPreview();
  updateSummaryStatus();
  sponsorInquiry.hidden = false;
  sponsorToggle.setAttribute('aria-expanded', 'true');
  sponsorToggle.textContent = 'Close sponsorship inquiry';
  document.querySelector('#sponsor-confirmation').textContent = 'Submitted fictional product prefilled for an optional local preview. Regenerate the inquiry review before applying. Nothing was sent or purchased. No pricing was agreed and no revenue was recorded.';
  sponsorship.elements.product.focus();
});
const placementApply = document.querySelector('#placement-apply');
const placementReset = document.querySelector('#placement-reset');
const cardFields = {
  product: document.querySelector('#sponsor-title'),
  description: document.querySelector('#sponsor-card-description'),
  cta: document.querySelector('#sponsor-card-cta')
};
const originalPlacement = Object.fromEntries(previewFields.map(field => [field, cardFields[field].textContent]));
const cardSchedule = document.querySelector('#sponsor-card-schedule');
const originalSchedule = cardSchedule.textContent;
let simulatedImpressions = 0;
let simulatedClicks = 0;
function renderPerformance() {
  document.querySelector('#simulated-impressions').textContent = String(simulatedImpressions);
  document.querySelector('#simulated-clicks').textContent = String(simulatedClicks);
  document.querySelector('#simulated-ctr').textContent = simulatedImpressions
    ? `${Number((simulatedClicks / simulatedImpressions * 100).toFixed(1))}%` : '0%';
}
function resetPerformance() {
  simulatedImpressions = 0;
  simulatedClicks = 0;
  renderPerformance();
}
document.querySelector('#simulate-impression').addEventListener('click', () => {
  simulatedImpressions += 1;
  renderPerformance();
});
function simulateClick() {
  simulatedImpressions += 1;
  simulatedClicks += 1;
  renderPerformance();
}
document.querySelector('#simulate-click').addEventListener('click', simulateClick);
const destination = document.querySelector('#product-destination');
cardFields.cta.addEventListener('click', () => {
  document.querySelector('#destination-title').textContent = cardFields.product.textContent;
  document.querySelector('#destination-description').textContent = cardFields.description.textContent;
  destination.showModal();
  simulateClick();
});
destination.addEventListener('close', () => cardFields.cta.focus());
function setPagePlacement(placement) {
  resetPerformance();
  cardSchedule.textContent = placement.start
    ? `Illustrative schedule: ${campaignSchedule(placement.start)} · Featured Launch · $49 total for seven days.`
    : originalSchedule;
  previewFields.forEach(field => { cardFields[field].textContent = placement[field].trim(); });
}
placementApply.addEventListener('click', () => {
  if (!inquirySnapshot || inquirySnapshotInvalidated || inquiryFields.some(field => sponsorship.elements[field].value !== inquirySnapshot[field])) return;
  setPagePlacement(inquirySnapshot);
  placementReset.disabled = false;
  document.querySelector('#placement-status').textContent = 'Reviewed snapshot applied as a local fictional placement preview. Product CTA opens a fictional destination and adds a simulated click and impression. Nothing was sent or purchased. No pricing was agreed and no revenue was recorded.';
});
placementReset.addEventListener('click', () => {
  setPagePlacement(originalPlacement);
  placementReset.disabled = true;
  document.querySelector('#placement-status').textContent = 'Original fictional sample restored · local placement preview only. Product CTA opens a fictional destination and adds a simulated click and impression. Nothing was sent or purchased. No pricing was agreed and no revenue was recorded.';
});
function updateSummaryStatus() {
  if (!inquirySnapshot) return;
  const outdated = inquirySnapshotInvalidated || inquiryFields.some(field => sponsorship.elements[field].value !== inquirySnapshot[field]);
  placementApply.disabled = outdated;
  document.querySelector('#inquiry-summary').classList.toggle('outdated', outdated);
  document.querySelector('#summary-status').textContent = outdated
    ? 'Outdated — fields have changed. Select “Preview inquiry locally” to regenerate this summary.'
    : 'Current — snapshot matches the inquiry fields.';
}
sponsorship.addEventListener('input', () => {
  updatePlacementPreview();
  updateSummaryStatus();
});
updatePlacementPreview();
sponsorship.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const company = form.elements.company.value.trim();
  if (!campaignSchedule(form.elements.start.value)) {
    document.querySelector('#sponsor-confirmation').textContent = 'Choose a valid illustrative start date.';
    form.elements.start.focus();
    return;
  }
  const confirmation = document.querySelector('#sponsor-confirmation');
  if (!company || !form.elements.email.value.trim() || previewFields.some(field => !form.elements[field].value.trim())) {
    confirmation.textContent = 'Enter fictional company, contact, and placement details to preview.';
    [form.elements.company, form.elements.email, ...previewFields.map(field => form.elements[field])].find(input => !input.value.trim()).focus();
    return;
  }
  inquirySnapshotInvalidated = false;
  inquirySnapshot = Object.fromEntries(inquiryFields.map(field => [field, form.elements[field].value]));
  const details = document.querySelector('#summary-details');
  const labels = ['Fictional company', 'Sample contact', 'Product name', 'Description', 'CTA label', 'Illustrative schedule'];
  details.replaceChildren();
  inquiryFields.forEach((field, index) => {
    details.append(element('dt', '', labels[index]), element('dd', '', field === 'start' ? `${campaignSchedule(inquirySnapshot.start)} · Featured Launch · $49 total. No reservation or availability guarantee.` : inquirySnapshot[field].trim()));
  });
  document.querySelector('#inquiry-summary').hidden = false;
  updateSummaryStatus();
  confirmation.textContent = `Local preview for ${company} complete. Nothing was sent or purchased. No pricing was agreed and no revenue was recorded.`;
});
render();

// Independent, in-memory fictional revenue planning scenario.
const scenarioCount = document.querySelector('#scenario-count');
function updateRevenueScenario() {
  const value = scenarioCount.value;
  const valid = /^[0-9]+$/.test(value);
  scenarioCount.setAttribute('aria-invalid', String(!valid));
  document.querySelector('#scenario-error').textContent = valid ? '' : value === ''
    ? 'Enter a placement count, including 0 for no placements.'
    : 'Use a nonnegative whole number (digits only).';
  document.querySelector('#scenario-result').textContent = valid
    ? `${BigInt(value).toLocaleString('en-US')} × $49 = $${(BigInt(value) * 49n).toLocaleString('en-US')} potential gross revenue · fictional scenario.`
    : 'Potential gross revenue unavailable until a valid count is entered.';
}
scenarioCount.addEventListener('input', updateRevenueScenario);
updateRevenueScenario();
