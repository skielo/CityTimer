(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('PROTECTED_PATHS', ['/citytimer'])
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('GENERIC_EVENTS', {
            addPartySuccess: 'add-party-success',
            removePartySuccess: 'remove-party-success',
            selectDayCalendar: 'select-day-calendar',
            partySelected: 'party-selected',
            editPartySuccess: 'edit-party-success'
        });

})();