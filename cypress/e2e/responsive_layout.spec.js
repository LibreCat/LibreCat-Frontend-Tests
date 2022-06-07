describe('The responsiveness of the app', function() {
    let devices = [
        'iphone-5',
        'iphone-6+',
        'ipad-mini',
        'ipad-2',
        'macbook-11',
        'macbook-15',
    ];

    devices.forEach((device) => {
        ['portrait', 'landscape'].forEach((mode) => {
            it(`should look good on a(n) ${device} in ${mode} mode`, function() {
                cy.viewport(device, mode);

                cy.visit('/');

                cy.screenshot();
            });
        });
    });
});
