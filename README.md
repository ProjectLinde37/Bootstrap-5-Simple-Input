# Goosse Input Component

A **fully self‑contained input component**.  
Built on top of **Bootstrap 5** (JS + CSS).

---

## Features

- ✅ Fully standalone
- ✅ Bootstrap 5 native (`Modal`)
- ✅ On‑demand DOM injection
- ✅ Self‑cleaning (DOM + events)
- ✅ Only **one input active at a time** (singleton guard)
- ✅ XSS‑safe (HTML escaping)
- ✅ MVC‑compliant
- ✅ Production‑first
- ✅ Numeric input support (`number`, `range`)
- ✅ Multi‑select support via native `<select multiple>`

---

## Demo

Live demo of the Goosse Input component:

👉 https://projectlinde37.github.io/Bootstrap-5-Simple-Input/

The demo showcases:
- Dynamic input modal using plain JavaScript
- Supported field types:
  - text
  - date
  - textarea
  - select (single & multiple)
  - radio
  - checkbox
  - hidden
  - number
  - range
- Default values and edit mode
- Client-side validation flow (`return false` keeps the modal open)
- Singleton guard (only one input modal at a time)
- Bootstrap‑native modal behaviour
- Interactive sliders with live value display

---

## Files

| Type | Path |
| :--- | :--- |
| **JS** | `public/goosse/input/input.js` |
| **CSS** | `public/goosse/input/input.css` |

**Requires:**
- Bootstrap 5 (JS + CSS)

---

## Basic usage

```js
goosseInput.open({
  title: 'Enter name',
  fields: [
    { type: 'text', name: 'name', label: 'Name' }
  ],
  onSubmit(data) {
    console.log(Object.fromEntries(data));
  }
});

### Multi‑select usage

The `select` field type supports **multiple selection** by enabling the `multiple` flag.
Preselected values can be provided as an **array**.

goosseInput.open({
  title: 'Select categories',
  fields: [
    {
      type: 'select',
      name: 'categorie_ids[]',
      label: 'Categorieën',
      multiple: true,
      value: [1, 3],
      options: {
        1: 'Open aanbod',
        2: 'Aanbod op maat',
        3: 'Sensibilisatie'
      }
    }
  ],
  onSubmit(data) {
    const selected = data.getAll('categorie_ids[]');
    console.log(selected);
  }
});
