# Goosse Input Component

Een **volledig zelfstandige input‑component**.  
Gebouwd bovenop **Bootstrap 5** (JS + CSS).

---

## Eigenschappen

- ✅ Volledig zelfstandig
- ✅ Bootstrap 5 native (`Modal`)
- ✅ On‑demand DOM injectie
- ✅ Zelfopruimend (DOM + events)
- ✅ Slechts **één input tegelijk** (singleton‑guard)
- ✅ XSS‑veilig (HTML escaping)
- ✅ MVC‑conform
- ✅ Production‑first

---

## Bestanden
| Type | Pad |
| :--- | :--- |
| **JS** | `public/goosse/input/input.js` |
| **CSS** | `public/goosse/input/input.css` |

**Vereist:**

*   Bootstrap 5 (JS + CSS)

***

## Basisgebruik

```js
goosseInput.open({
  title: 'Naam invoeren',
  fields: [
    { type: 'text', name: 'naam', label: 'Naam' }
  ],
  onSubmit(data) {
    console.log(Object.fromEntries(data));
  }
});
```

***

## API

### `goosseInput.open(options)`

#### Beschikbare opties

| Optie         | Type     | Beschrijving                         |
| ------------- | -------- | ------------------------------------ |
| `title`       | string   | Titel van de modal                   |
| `description` | string   | Optionele uitleg                     |
| `fields`      | array    | Definitie van inputs (**verplicht**) |
| `submitText`  | string   | Tekst op submitknop                  |
| `cancelText`  | string   | Tekst op annuleren (leeg = verbergen)|
| `submitClass` | string   | Bootstrap knopklasse                 |
| `onSubmit`    | function | Callback bij submit                  |

***

## Ondersteunde veldtypes

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

## Field‑definitie

```js
{
  type: 'text',
  name: 'email',
  label: 'E‑mail',
  value: 'test@example.com', // optioneel
  placeholder: 'naam@domein.be', // optioneel
  options: {}                // enkel voor select/radio
}
```

***

## Voorbeelden

### 1. Meerdere inputtypes

```js
goosseInput.open({
  title: 'Profiel',
  fields: [
    { type: 'text', name: 'gebruikersnaam', label: 'Gebruikersnaam' },
    { type: 'date', name: 'geboortedatum', label: 'Geboortedatum' },
    {
      type: 'radio',
      name: 'geslacht',
      label: 'Geslacht',
      options: { m: 'Man', v: 'Vrouw' }
    },
    {
      type: 'select',
      name: 'land',
      label: 'Land',
      options: { be: 'België', nl: 'Nederland' }
    },
    {
      type: 'checkbox',
      name: 'nieuwsbrief',
      label: 'Inschrijven op nieuwsbrief'
    },
    {
      type: 'textarea',
      name: 'opmerking',
      label: 'Opmerking'
    }
  ],
  onSubmit(data) {
    console.table(Object.fromEntries(data));
  }
});
```

***

### 2. Edit‑modus met default values

```js
goosseInput.open({
  title: 'Gebruiker bewerken',
  fields: [
    { type: 'text', name: 'naam', label: 'Naam', value: 'Bart' },
    {
      type: 'select',
      name: 'rol',
      label: 'Rol',
      value: 'admin',
      options: {
        user: 'Gebruiker',
        admin: 'Administrator'
      }
    },
    {
      type: 'checkbox',
      name: 'actief',
      label: 'Actief',
      value: true
    }
  ],
  onSubmit(data) {
    console.log(Object.fromEntries(data));
  }
});
```

***

### 3. Hidden velden & placeholders

```js
goosseInput.open({
  title: 'Instellingen',
  fields: [
    { type: 'hidden', name: 'id', value: '123' },
    { type: 'text', name: 'api_key', label: 'API Key', placeholder: 'Vul uw sleutel in...' }
  ],
  onSubmit(data) {
    console.log('ID:', data.get('id'));
    console.log('Key:', data.get('api_key'));
  }
});
```

***

### 4. Eenvoudige bevestiging (met checkbox)

```js
goosseInput.open({
  title: 'Verwijderen bevestigen',
  description: 'Vink het vakje aan om te bevestigen dat u dit item wilt verwijderen.',
  submitText: 'Verwijderen',
  submitClass: 'btn-danger',
  fields: [
    { type: 'checkbox', name: 'confirm', label: 'Ik begrijp dat dit niet ongedaan kan worden gemaakt' }
  ],
  onSubmit(data) {
    if (!data.has('confirm')) {
      alert('U moet bevestigen voordat u kunt doorgaan.');
      return false;
    }
    console.log('Item verwijderd');
  }
});
```

***

### 5. Uitgebreid configuratie-voorbeeld

```js
goosseInput.open({
  title: 'Systeeminstellingen',
  fields: [
    { type: 'hidden', name: 'config_id', value: 'sys_01' },
    { type: 'text', name: 'site_name', label: 'Websitenaam', value: 'Mijn Project' },
    { 
      type: 'select', 
      name: 'theme', 
      label: 'Thema', 
      value: 'dark',
      options: { light: 'Licht', dark: 'Donker', auto: 'Systeem' }
    },
    { 
      type: 'radio', 
      name: 'notifications', 
      label: 'Notificaties', 
      value: 'email',
      options: { none: 'Geen', email: 'E-mail', push: 'Push-berichten' }
    },
    { type: 'checkbox', name: 'maintenance', label: 'Onderhoudsmodus inschakelen' }
  ],
  onSubmit(data) {
    const config = Object.fromEntries(data);
    console.log('Nieuwe configuratie:', config);
  }
});
```

***

### 6. Gebruik met AJAX / Promises (Automatische flow)

De component herkent automatisch Promises. De modal blijft open zolang de Promise loopt en sluit pas als deze succesvol (`resolve`) wordt afgerond zonder dat er `false` wordt teruggegeven.

```js
goosseInput.open({
  title: 'Data Opslaan',
  fields: [{ type: 'text', name: 'naam', label: 'Naam' }],
  onSubmit(data) {
    // Modal blijft open tijdens de fetch
    return fetch('/api/save', { method: 'POST', body: data })
      .then(r => r.json())
      .then(res => {
        if (!res.success) {
          alert(res.error);
          return false; // Modal open houden bij fout
        }
        // Modal sluit automatisch na succes
      });
  }
});
```

***

## Veiligheid (XSS)

Alle labels, titels, beschrijvingen en placeholders worden automatisch ge-escaped. Je kunt veilig user-input of data uit een database gebruiken in de configuratie:

```js
goosseInput.open({
  title: user.display_name, // Automatisch veilig
  description: `Instellingen voor ${user.email}`,
  // ...
});
```

***

## 🧠 Configuratie

Je kunt globale instellingen aanpassen via het `config` object in een `<script>` tag in je HTML.

```html
<script>
  // Pas het waarschuwingsbericht aan voor dubbele aanroepen
  goosseInput.config.duplicateWarning = 'U bent al iets aan het invoeren.';
</script>
```

***

## Waarden terugkrijgen (belangrijkste user‑cases)

### ✅ Alles als object (meest gebruikt)

```js
onSubmit(data) {
  const values = Object.fromEntries(data.entries());
  console.log(values);
}
```

***

### ✅ Individuele velden

```js
onSubmit(data) {
  const naam = data.get('naam');
  const actief = data.has('actief'); // checkbox
}
```

***

### ✅ Checkbox correct interpreteren

```js
const actief = data.has('actief');
```

> Checkboxen zijn **alleen aanwezig als ze aangevinkt zijn**.

***

## MVC / PHP use‑case (AJAX)

### JavaScript

```js
goosseInput.open({
  title: 'Gebruiker aanmaken',
  fields: [
    { type: 'text', name: 'naam', label: 'Naam' },
    { type: 'checkbox', name: 'actief', label: 'Actief' }
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
        return false; // modal open houden
      }
    });

  }
});
```

***

### PHP Controller (voorbeeld)

```php
public function store()
{
    $naam = $_POST['naam'] ?? '';
    $actief = isset($_POST['actief']);

    if ($naam === '') {
        echo json_encode([
            'success' => false,
            'error' => 'Naam is verplicht'
        ]);
        exit;
    }

    // Opslaan...
    echo json_encode(['success' => true]);
}
```

***

## Validatie & flow‑controle

### Modal open houden bij fout

```js
onSubmit(data) {
  if (!data.get('email')) {
    alert('E-mail is verplicht');
    return false; // ✅ blijft open
  }
}
```

***

## Singleton‑gedrag (belangrijk)

*   De component staat **slechts één actieve input tegelijk toe**
*   Extra `open()` calls worden genegeerd
*   Wanneer er al een venster openstaat, wordt er een feedback-melding getoond via `goosseToast` (of via een standaard `alert` als de toast-module niet geladen is)
*   Na sluiten wordt de instance netjes opgeruimd

➡️ Voorkomt UX‑ en focusproblemen

***

## Bewuste ontwerpkeuzes

*   ❌ Geen globale HTML
*   ❌ Geen framework‑magie
*   ✅ Expliciete lifecycle
*   ✅ Server‑side validatie blijft leidend
*   ✅ Bootstrap als stabiele primitive

***

## Uitbreidingen (optioneel)

*   field‑level error rendering
*   CSRF hidden input
*   `required / readonly / disabled`
*   non‑modal variant (drawer / inline)

***

## Conclusie

De **Goosse Input Component** is:

*   klein
*   voorspelbaar
*   robuust
*   perfect geschikt voor MVC‑applicaties

Gebruik `onSubmit(FormData)` als **enige bron van waarheid** voor inputwaarden.
