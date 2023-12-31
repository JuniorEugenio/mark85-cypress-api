describe('POST/sessions', () => {

    beforeEach(() => {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    it('user session', function () {

        const userData = this.users.login

        cy.postSession(userData)
            .then(response => {

                const { user, token } = response.body

                expect(response.status).to.eq(200)
                expect(user.name).to.eq(userData.name)
                expect(user.email).to.eq(userData.email)
                expect(token).not.to.be.empty
            })
    })

    it('invalid password', function () {
        const user = this.users.inv_pass


        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })

    })
    it('email not found', function () {
        const user = this.users.email_not_found

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })

    })

})

