Cypress.Commands.add('login', (username, password) => {
    username = username || 'test';
    password = password || 'secret';

    // Initiate command log
    let consoleProps = {
        username: username,
        password: password,
    };

    let log = Cypress.log({
        name: 'login',
        message: [username, password],
        consoleProps: () => {
            return consoleProps;
        },
    });

    // ... go get it ...
    cy.request(
        {
            method: 'POST',
            url: '/login',
            form: true,
            log: false,
            body: {
                user: username,
                pass: password,
            },
        })
        .then(() => {
            log.snapshot().end();
        });
});
