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

---
## Demo

Live demo of the Goosse Dialog component:

👉 https://projectlinde37.github.io/Bootstrap-5-Simple-Dialog/

The demo showcases:
- All dialog types (`info`, `warning`, `danger`, `success`)
- Confirm and cancel behaviour
- Singleton guard (only one dialog at a time)
- Bootstrap‑native modal behaviour
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
````

***

## API

### `goosseInput.open(options)`

#### Available options

| Option        | Type     | Description                         |
| ------------- | -------- | ----------------------------------- |
| `title`       | string   | Modal title                         |
| `description` | string   | Optional description                |
| `fields`      | array    | Input definitions (**required**)    |
| `submitText`  | string   | Submit button text                  |
| `cancelText`  | string   | Cancel button text (empty = hidden) |
| `submitClass` | string   | Bootstrap button class              |
| `onSubmit`    | function | Submit callback                     |

***

## Supported field types

```js
text
date
textarea
select
radio
checkbox
hidden
```

***

## Field definition

```js
{
  type: 'text',
  name: 'email',
  label: 'Email',
  value: 'test@example.com',      // optional
  placeholder: 'name@domain.com', // optional
  options: {}                     // select / radio only
}
```

***

## Examples

### 1. Multiple input types

```js
goosseInput.open({
  title: 'Profile',
  fields: [
    { type: 'text', name: 'username', label: 'Username' },
    { type: 'date', name: 'birthdate', label: 'Date of birth' },
    {
      type: 'radio',
      name: 'gender',
      label: 'Gender',
      options: { m: 'Male', v: 'Female' }
    },
    {
      type: 'select',
      name: 'country',
      label: 'Country',
      options: { be: 'Belgium', nl: 'Netherlands' }
    },
    {
      type: 'checkbox',
      name: 'newsletter',
      label: 'Subscribe to newsletter'
    },
    {
      type: 'textarea',
      name: 'notes',
      label: 'Notes'
    }
  ],
  onSubmit(data) {
    console.table(Object.fromEntries(data));
  }
});
```

***

### 2. Edit mode with default values

```js
goosseInput.open({
  title: 'Edit user',
  fields: [
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

### 3. Hidden fields & placeholders

```js
goosseInput.open({
  title: 'Settings',
  fields: [
    { type: 'hidden', name: 'id', value: '123' },
    { type: 'text', name: 'api_key', label: 'API Key', placeholder: 'Enter your key…' }
  ],
  onSubmit(data) {
    console.log('ID:', data.get('id'));
    console.log('Key:', data.get('api_key'));
  }
});
```

***

### 4. Simple confirmation (with checkbox)

```js
goosseInput.open({
  title: 'Confirm deletion',
  description: 'Tick the checkbox to confirm that you want to delete this item.',
  submitText: 'Delete',
  submitClass: 'btn-danger',
  fields: [
    { 
      type: 'checkbox',
      name: 'confirm',
      label: 'I understand that this cannot be undone'
    }
  ],
  onSubmit(data) {
    if (!data.has('confirm')) {
      alert('You must confirm before continuing.');
      return false;
    }
    console.log('Item deleted');
  }
});
```

***

### 5. Advanced configuration example

```js
goosseInput.open({
  title: 'System settings',
  fields: [
    { type: 'hidden', name: 'config_id', value: 'sys_01' },
    { type: 'text', name: 'site_name', label: 'Website name', value: 'My Project' },
    { 
      type: 'select', 
      name: 'theme', 
      label: 'Theme', 
      value: 'dark',
      options: { light: 'Light', dark: 'Dark', auto: 'System' }
    },
    { 
      type: 'radio', 
      name: 'notifications', 
      label: 'Notifications', 
      value: 'email',
      options: { none: 'None', email: 'Email', push: 'Push notifications' }
    },
    { type: 'checkbox', name: 'maintenance', label: 'Enable maintenance mode' }
  ],
  onSubmit(data) {
    const config = Object.fromEntries(data);
    console.log('New configuration:', config);
  }
});
```

***

### 6. Usage with AJAX / Promises (automatic flow)

The component automatically detects Promises.\
The modal stays open while the Promise is pending and closes only when it resolves successfully without returning `false`.

```js
goosseInput.open({
  title: 'Save data',
  fields: [{ type: 'text', name: 'name', label: 'Name' }],
  onSubmit(data) {
    return fetch('/api/save', { method: 'POST', body: data })
      .then(r => r.json())
      .then(res => {
        if (!res.success) {
          alert(res.error);
          return false; // keep modal open on error
        }
        // modal closes automatically on success
      });
  }
});
```

***

## Security (XSS)

All labels, titles, descriptions and placeholders are automatically escaped.\
It is safe to use user input or database values in the configuration:

```js
goosseInput.open({
  title: user.display_name, // automatically safe
  description: `Settings for ${user.email}`,
  // ...
});
```

***

## 🧠 Configuration

Global settings can be customised via the `config` object in a `<script>` tag in your HTML.



***

## Getting values back (key use cases)

### ✅ All values as an object (most common)

```js
onSubmit(data) {
  const values = Object.fromEntries(data.entries());
  console.log(values);
}
```

***

### ✅ Individual fields

```js
onSubmit(data) {
  const name = data.get('name');
  const active = data.has('active'); // checkbox
}
```

***

### ✅ Correct checkbox handling

```js
const active = data.has('active');
```

> Checkboxes are **only present when checked**.

***

## MVC / PHP use case (AJAX)

### JavaScript

```js
goosseInput.open({
  title: 'Create user',
  fields: [
    { type: 'text', name: 'name', label: 'Name' },
    { type: 'checkbox', name: 'active', label: 'Active' }
  ],
  onSubmit(data) {

    return fetch('/user/store', {
      method: 'POST',
      body: data
    })
    .then(r => r.json())
    .then(result => {
      if (!result.success) {
        alert(result.error);
        return false; // keep modal open
      }
    });

  }
});
```

***

### PHP Controller (example)

```php
public function store()
{
    $name = $_POST['name'] ?? '';
    $active = isset($_POST['active']);

    if ($name === '') {
        echo json_encode([
            'success' => false,
            'error' => 'Name is required'
        ]);
        exit;
    }

    // Save...
    echo json_encode(['success' => true]);
}
```

***

## Validation & flow control

### Keep modal open on error

```js
onSubmit(data) {
  if (!data.get('email')) {
    alert('Email is required');
    return false; // ✅ stays open
  }
}
```

***

## Singleton behaviour (important)

*   The component allows **only one active input at a time**
*   Additional `open()` calls are ignored
*   When an input is already open, feedback is shown via `goosseToast`
    (or a native `alert` if the toast module is not loaded)
*   After closing, the instance is properly cleaned up

➡️ Prevents UX and focus issues

***

## Intentional design decisions

*   ❌ No static HTML
*   ❌ No framework magic
*   ✅ Explicit lifecycle
*   ✅ Server‑side validation remains authoritative
*   ✅ Bootstrap used as a stable primitive

***

## Extensions (optional)

*   Field‑level error rendering
*   CSRF hidden input
*   `required / readonly / disabled`
*   Non‑modal variant (drawer / inline)

***

## Conclusion

The **Goosse Input Component** is:

*   small
*   predictable
*   robust
*   perfectly suited for MVC applications

Use `onSubmit(FormData)` as the **single source of truth** for input values.

