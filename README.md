# Goosse Input Component

**Version 1.0** — see [CHANGELOG.md](CHANGELOG.md)

A **fully self‑contained input modal component** built on top of **Bootstrap 5**.  
Designed for **admin interfaces**, **MVC applications** and **production use**.

This component provides a clean, explicit way to collect user input using
a modal dialog — without frameworks, dependencies or hidden magic.

---

## Philosophy

- ✅ Explicit over implicit
- ✅ Plain JavaScript
- ✅ Bootstrap‑native (Modal)
- ✅ MVC‑friendly
- ✅ Production‑first
- ✅ No black boxes

The component is intentionally **small and opinionated**:
it solves input modals well, and nothing more.

---

## Features

- ✅ Fully standalone (JS + CSS only)
- ✅ Bootstrap 5 native modal
- ✅ On‑demand DOM injection
- ✅ Automatic cleanup (DOM + events)
- ✅ Singleton guard (only one modal at a time)
- ✅ XSS‑safe (HTML escaping)
- ✅ Promise‑aware submit handling
- ✅ Edit mode support (pre‑filled values)
- ✅ Numeric inputs (`number`, `range`)
- ✅ **Multi‑select support via native `<select multiple>`**

---

## Requirements

- **Bootstrap 5**
  - `bootstrap.bundle.js` (Modal required)
  - Bootstrap CSS

No other dependencies.

---

## File structure

| Type | Path |
|---|---|
| **JavaScript** | `public/goosse/input/input.js` |
| **CSS** | `public/goosse/input/input.css` |

---

## Supported field types

| Type | Description |
|---|---|
| `text` | Single‑line text |
| `date` | Date picker |
| `textarea` | Multi‑line text |
| `select` | Dropdown (single or multiple) |
| `radio` | Radio button group |
| `checkbox` | Single checkbox |
| `hidden` | Hidden input |
| `number` | Numeric input |
| `range` | Slider with live value |

⚠️ **There is no separate `multiselect` type**.  
Multi‑select is handled via `type: "select"` with `multiple: true`.

---

## Basic usage

```js
goosseInput.open({
  title: 'Enter name',
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'John Doe'
    }
  ],
  onSubmit(data) {
    console.log(Object.fromEntries(data));
  }
});
````

* `fields` is **required**
* `onSubmit` receives a `FormData` instance
* Returning `false` keeps the modal open

***

## Multiple fields example

```js
goosseInput.open({
  title: 'User profile',
  fields: [
    { type: 'text', name: 'username', label: 'Username' },
    { type: 'date', name: 'birthdate', label: 'Birth date' },
    {
      type: 'select',
      name: 'country',
      label: 'Country',
      options: {
        be: 'Belgium',
        nl: 'Netherlands',
        fr: 'France'
      }
    },
    {
      type: 'radio',
      name: 'gender',
      label: 'Gender',
      options: {
        m: 'Male',
        f: 'Female'
      }
    },
    {
      type: 'checkbox',
      name: 'newsletter',
      label: 'Subscribe to newsletter'
    }
  ],
  onSubmit(data) {
    console.log(Object.fromEntries(data));
  }
});
```

***

## Edit mode (pre‑filled values)

```js
goosseInput.open({
  title: 'Edit user',
  fields: [
    { type: 'hidden', name: 'id', value: '42' },
    { type: 'text', name: 'name', label: 'Name', value: 'Bart' },
    {
      type: 'select',
      name: 'role',
      label: 'Role',
      value: 'admin',
      options: {
        user: 'User',
        admin: 'Administrator'
      }
    },
    {
      type: 'checkbox',
      name: 'active',
      label: 'Active',
      value: true
    }
  ],
  onSubmit(data) {
    console.log(Object.fromEntries(data));
  }
});
```

***

## Multi‑select usage (IMPORTANT)

Multi‑select is supported via **native `<select multiple>`**.

```js
goosseInput.open({
  title: 'Select categories',
  fields: [
    {
      type: 'select',
      name: 'categorie_ids[]',
      label: 'Categories',
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
```

### Notes

* ✅ Use `multiple: true`
* ✅ Use an **array** for `value`
* ✅ Use `FormData.getAll(name)` to retrieve values
* ❌ Do **not** use `type: "multiselect"` (does not exist)

***

## Numeric inputs

```js
goosseInput.open({
  title: 'Advanced input',
  fields: [
    {
      type: 'number',
      name: 'age',
      label: 'Age',
      value: 30,
      options: { min: 0, max: 120 }
    },
    {
      type: 'range',
      name: 'volume',
      label: 'Volume',
      value: 50,
      options: { min: 0, max: 100, step: 5 }
    }
  ],
  onSubmit(data) {
    console.log(Object.fromEntries(data));
  }
});
```

***

## Validation flow

```js
onSubmit(data) {
  if (!data.get('confirm')) {
    alert('Please confirm first');
    return false; // modal stays open
  }
}
```

* Returning `false` prevents closing
* Promises are supported

***

## Singleton behaviour

Only **one input modal** can be open at any time.

If `open()` is called while another modal is active:

* a warning toast is shown
* the existing modal stays open

This avoids UI chaos in admin panels.

***

## Accessibility & security

* ✅ Uses native HTML inputs
* ✅ Compatible with Bootstrap accessibility features
* ✅ Escapes all labels and values (XSS‑safe)
* ✅ Designed to work with server‑side validation
* ✅ CSRF protection is expected at controller level

***

## When to use this component

✅ Admin panels  
✅ Internal tools  
✅ CRUD interfaces  
✅ MVC‑based applications

❌ Public forms requiring heavy UX  
❌ Complex conditional form builders  
❌ Front‑end frameworks (React/Vue)

***

## Demo

Live demo:  
👉 <https://projectlinde37.github.io/Bootstrap-5-Simple-Input/>

The demo showcases:

* All supported field types
* Edit mode
* Validation flow
* Multi‑select usage
* Numeric inputs

***

## License

MIT — use freely, modify responsibly.

```
