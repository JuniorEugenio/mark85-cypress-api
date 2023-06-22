describe('POST /users', () => {

  beforeEach(() => {
    cy.fixture('created').then(function (created) {
      this.created = created
    })
  })

  it('register a new user', function () {

    const user = this.created.create

    cy.task('removeUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(201)
      })

  })

  it('duplicate email', function () {

    const user = this.created.dup_email

    cy.task('removeUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {

        const { message } = response.body

        expect(response.status).to.eq(409)
        expect(message).to.eq('Duplicated email!')
      })

  })

  context('required fields', () => {
    let user;

    beforeEach(function () {
      user = this.created.required
    })

    it('name is required', () => {
      delete user.name

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"name\" is required')
        })
    })
    it('email is required', function () {
      delete user.email

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is required')
        })
    })
    it('password is required', function () {
      delete user.password

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"password\" is required')
        })
    })
  })

})



