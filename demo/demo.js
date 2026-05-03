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