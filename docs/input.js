/* ==========================================================================
   Goosse Input Component
   - Volledig zelfstandig
   - Bootstrap 5 native
   - On-demand DOM injectie
   - Zelfopruimend
   
   Depends on Bootstrap 5 (bootstrap.bundle.js via CDN)
   Uses: bootstrap.Modal
   ========================================================================== */

(function (window)
{
    'use strict';
    let activeInstance = null;
    const CONFIG = {
        /* Hier kunnen later globale instellingen voor de input module komen */
        duplicateWarning: 'Er is al een invoervenster geopend.'
    };

    function openInput(options)
    {

// ✅ Singleton guard: slechts 1 input tegelijk
        if (activeInstance) {
            if (window.goosseToast) {
                window.goosseToast.show({
                    type: 'warning',
                    title: 'Aandacht',
                    message: CONFIG.duplicateWarning
                });
            } else {
                // Fallback als toast niet geladen is
                alert(CONFIG.duplicateWarning);
            }
            return;
        }

        const {
            title = 'Invoer',
            description = '',
            fields = [],
            submitText = 'Opslaan',
            cancelText = 'Annuleren',
            submitClass = 'btn-primary',
            onSubmit = null
        } = options || {};

        if (!Array.isArray(fields) || fields.length === 0) {
            throw new Error('GoosseInput: fields is verplicht');
        }

        const id = 'goosse-input-' + (crypto.randomUUID?.() || Date.now());

        const container = document.createElement('div');
        container.innerHTML = `
<div class="modal fade goosse-input" id="${id}" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <form class="goosse-input-form" novalidate>

        <div class="modal-header">
          <h5 class="modal-title">${esc(title)}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          ${description ? `<p class="goosse-input-description">${esc(description)}</p>` : ''}
          <div class="goosse-input-fields"></div>
        </div>

        <div class="modal-footer">
          ${cancelText ? `
            <button type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
              ${esc(cancelText)}
            </button>` : ''}
          <button type="submit" class="btn ${esc(submitClass)}">
            ${esc(submitText)}
          </button>
        </div>

      </form>

    </div>
  </div>
</div>`;

        document.body.appendChild(container);

        const modalEl = document.getElementById(id);
        const modal = new bootstrap.Modal(modalEl, {
            backdrop: 'static',
            keyboard: false
        });

        const fieldsEl = modalEl.querySelector('.goosse-input-fields');
        const formEl = modalEl.querySelector('.goosse-input-form');

        fields.forEach(field =>
        {
            fieldsEl.appendChild(renderField(field));
        });

        formEl.addEventListener('submit', function (e)
        {
            e.preventDefault();
            const data = new FormData(formEl);

            if (typeof onSubmit === 'function') {
                const result = onSubmit(data);

                if (result === false) return;

                // ✅ Promise ondersteuning (AJAX-ready)
                if (result instanceof Promise) {
                    result.then(r =>
                    {
                        if (r !== false) modal.hide();
                    });
                    return;
                }
            }

            modal.hide();
        });

        modalEl.addEventListener('hidden.bs.modal', function ()
        {

            activeInstance = null;   // ✅ singleton vrijgeven
            container.remove();      // ✅ DOM cleanup

        });

        modal.show();
        // ✅ markeer deze input als actief pas NA succesvolle show
        activeInstance = modal;
    }

    /* ==========================
       Helpers
       ========================== */

    /**
     * Eenvoudige HTML escaping voor veiligheid (XSS)
     */
    function esc(str = '')
    {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /* ==========================
       Field renderer
       ========================== */

    function renderField(field)
    {
        const {
            type = 'text',
            name,
            label = '',
            value = '',
            placeholder = '',
            options = {}
        } = field;

        if (!name) {
            throw new Error('GoosseInput: field zonder name');
        }

        const el = document.createElement('div');
        el.className = 'goosse-input-field';

        if (type === 'hidden') {
            el.style.display = 'none';
            el.innerHTML = `<input type="hidden" name="${name}" value="${value}">`;
            return el;
        }

        switch (type) {

            case 'text':
            case 'date':
                el.innerHTML = `
<label class="form-label">${esc(label)}</label>
<input type="${type}" name="${name}" class="form-control" value="${esc(value)}" placeholder="${esc(placeholder)}">
        `;
                break;

            case 'textarea':
                el.innerHTML = `
<label class="form-label">${esc(label)}</label>
<textarea name="${name}" class="form-control" placeholder="${esc(placeholder)}">${esc(value)}</textarea>
        `;
                break;

            case 'select':
                el.innerHTML = `
<label class="form-label">${esc(label)}</label>
<select name="${name}" class="form-select">
  ${Object.entries(options).map(
                    ([v, t]) => `<option value="${v}" ${String(v) === String(value) ? 'selected' : ''}>${esc(t)}</option>`
                ).join('')}
</select>`;
                break;

            case 'checkbox':
                el.innerHTML = `
<div class="form-check">
  <input class="form-check-input" type="checkbox" name="${name}" value="1" ${value && value !== '0' ? 'checked' : ''}>
  <label class="form-check-label">${esc(label)}</label>
</div>`;
                break;

            case 'radio':
                el.innerHTML = `
<label class="form-label d-block">${esc(label)}</label>
${Object.entries(options).map(
                    ([v, t]) => `
<div class="form-check">
  <input class="form-check-input" type="radio" name="${name}" value="${v}" ${String(v) === String(value) ? 'checked' : ''}>
  <label class="form-check-label">${esc(t)}</label>
</div>`
                ).join('')}`;
                break;

            default:
                throw new Error('GoosseInput: onbekend type ' + type);
        }

        return el;
    }

    /* ==========================
       Public API
       ========================== */

    window.goosseInput = {
        config: CONFIG,
        open(options)
        {
            openInput(options);
        }
    };

})(window);