global.plack_sessions = {};

Cypress.Commands.add('login', (username, password) => {
    username = username || 'test';
    password = password || 'secret';

    // Initiate command log
    let log = Cypress.log({
        name: 'login',
        message: [username, password],
        consoleProps: () => {
            return {
                username: username,
                password: password,
            };
        },
    });

        // If we don't have a cookie for {username} yet...
    if (!global.plack_sessions[username]) {
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
            });

        // ... and save it
        cy.getCookie('plack_session', {log: false}).then((cookie) => {
            global.plack_sessions[username] = cookie;
        });
    }

    // Set cookie again and end this command
    cy.then(() => {
        let cookie = Object.assign(global.plack_sessions[username], {log: false});

        cy.setCookie('plack_session', cookie.value, cookie)
            .then(() => {
                log.snapshot().end();
            });
    });
});
