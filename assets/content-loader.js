// Loads assets/content.json and fills in the page.
// If the file is missing, unreachable, or has a syntax error, this fails
// quietly and the placeholder text already written in the HTML stays put --
// a bad edit to content.json should never blank out or break a page.

fetch('assets/content.json')
  .then(function (res) { return res.json(); })
  .then(function (data) { applyContent(data); })
  .catch(function (err) { console.warn('content.json not loaded, showing placeholder text instead:', err); });

function applyContent(data) {
  try { renderCommunity(data.community); } catch (e) { console.warn('community section skipped:', e); }
  try { renderDocuments(data.documents); } catch (e) { console.warn('documents section skipped:', e); }
  try { renderContact(data.contact); } catch (e) { console.warn('contact section skipped:', e); }
}

function renderCommunity(community) {
  if (!community) return;
  var desc = document.querySelector('[data-field="community-description"]');
  if (desc && community.description && community.description.trim()) {
    desc.textContent = community.description;
  }
  var mission = document.querySelector('[data-field="mission-statement"]');
  if (mission && community.mission && community.mission.trim()) {
    mission.textContent = community.mission;
  }
}

function renderDocuments(documents) {
  var list = document.querySelector('[data-field="doc-list"]');
  if (!list || !Array.isArray(documents) || documents.length === 0) return;
  list.innerHTML = '';
  documents.forEach(function (doc) {
    var li = document.createElement('li');
    var nameEl;
    if (doc.url && doc.url.trim()) {
      nameEl = document.createElement('a');
      nameEl.href = doc.url;
      nameEl.target = '_blank';
      nameEl.rel = 'noopener';
    } else {
      nameEl = document.createElement('span');
    }
    nameEl.className = 'doc-name';
    nameEl.textContent = doc.name || '';
    var status = document.createElement('span');
    status.className = 'doc-status';
    status.textContent = doc.status || '';
    li.appendChild(nameEl);
    li.appendChild(status);
    list.appendChild(li);
  });
}

function renderContact(contact) {
  if (!contact) return;

  var emailLink = document.querySelector('[data-field="contact-email"]');
  if (emailLink && contact.email && contact.email.trim()) {
    emailLink.href = 'mailto:' + contact.email;
    emailLink.textContent = contact.email;
  }

  var addressEl = document.querySelector('[data-field="contact-address"]');
  if (addressEl && Array.isArray(contact.addressLines) && contact.addressLines.length) {
    addressEl.innerHTML = '';
    contact.addressLines.forEach(function (line, i) {
      if (i > 0) addressEl.appendChild(document.createElement('br'));
      addressEl.appendChild(document.createTextNode(line));
    });
  }
}
