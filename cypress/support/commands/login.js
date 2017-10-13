global.plack_sessions = {};

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

    // If we don't have a cookie for {username} yet...
    if (!global.plack_sessions[username]) {
        cy.clearCookie('plack_session', {log: false});

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

        consoleProps.cookie = cookie.value;

        cy.setCookie('plack_session', cookie.value, cookie)
            .then(() => {
                log.snapshot().end();
            });
    });
});
