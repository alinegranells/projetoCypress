describe('alertas', () => {
  
    it('valida o alerta de credencial invalida', () => {

        cy.clock()
        
        cy.visit('/login')
        
        // preenche o campo email
        cy.getElement('login-email')
            .type('pedro@pedro.com') // quando as credenciais sao invalidas nao tem problema deixar no codigo

        // preenche o campo senha
        cy.getElement('login-password')
            .type('123456')

        // clica no botao login
        cy.getElement('login-submit')
            .click()

        // valida o alerta de credencial invalida
        cy.getElement('alert')
            .should('have.text', 'Credenciais inválidas')

        // cy.wait(10000) - não precisa esperar 10000 pois podemos adiantar o relogio no servidor com o cy tick - wait nao é uma boa pratica

        cy.tick(10000)

        // verificar se o alerta desapareceu
        
        cy.getElement('alert')
            .should('not.exist')
    })
})