/* ==========================================================================
   Goosse Input – Demo examples
   ========================================================================== */

/* 1️⃣ Basic input */
document.getElementById('btn-basic').addEventListener('click', () => {
    goosseInput.open({
        title: 'Enter your name',
        fields: [
            { type: 'text', name: 'name', label: 'Name', placeholder: 'John Doe' }
        ],
        onSubmit(data) {
            alert('Hello ' + data.get('name'));
        }
    });
});

/* 2️⃣ Multiple field types */
document.getElementById('btn-multi').addEventListener('click', () => {
    goosseInput.open({
        title: 'User profile',
        fields: [
            { type: 'text', name: 'username', label: 'Username' },
            { type: 'date', name: 'birthdate', label: 'Date of birth' },
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
            alert('Check the console for submitted values.');
        }
    });
});

/* 3️⃣ Confirmation with checkbox */
document.getElementById('btn-confirm').addEventListener('click', () => {
    goosseInput.open({
        title: 'Confirm deletion',
        description: 'You must confirm before continuing.',
        submitText: 'Delete',
        submitClass: 'btn-danger',
        fields: [
            {
                type: 'checkbox',
                name: 'confirm',
                label: 'I understand this action cannot be undone'
            }
        ],
        onSubmit(data) {
            if (!data.has('confirm')) {
                alert('Please confirm the action.');
                return false; // keep modal open
            }
            alert('Item deleted (demo)');
        }
    });
});

/* 4️⃣ Edit mode + hidden field */
document.getElementById('btn-edit').addEventListener('click', () => {
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
            console.log('Submitted:', Object.fromEntries(data));
            alert('User updated (demo)');
        }
    });
});

/* 5️⃣ Number + range (slider) */
document.getElementById('btn-advanced').addEventListener('click', () => {
    goosseInput.open({
        title: 'Advanced input',
        description: 'Demo van number en slider inputs.',
        fields: [
            {
                type: 'number',
                name: 'age',
                label: 'Age',
                value: 30,
                placeholder: 'Enter age',
                options: {
                    min: 0,
                    max: 120,
                    step: 1
                }
            },
            {
                type: 'number',
                name: 'price',
                label: 'Price (€)',
                value: 10,
                options: {
                    min: 0,
                    max: 1000,
                    step: 0.5
                }
            },
            {
                type: 'range',
                name: 'volume',
                label: 'Volume',
                value: 50,
                options: {
                    min: 0,
                    max: 100,
                    step: 5
                }
            },
            {
                type: 'range',
                name: 'satisfaction',
                label: 'Satisfaction',
                value: 3,
                options: {
                    min: 1,
                    max: 5,
                    step: 1
                }
            }
        ],
        onSubmit(data) {
            const values = Object.fromEntries(data);
            console.log(values);
            alert(
                `Age: ${values.age}\nPrice: €${values.price}\nVolume: ${values.volume}\nSatisfaction: ${values.satisfaction}`
            );
        }
    });
});