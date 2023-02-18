describe('paginação da pagina de QAs', () => {

    it('valida paginacao com 7 perfis', () => {

        cy.intercept('GET', '/api/profile', { fixture: 'paginacao_7_usuarios'})
            .as('perfis')

        // cy.log('teste') - teste para ver se tá tudo ok

        cy.visit('/perfis')

        cy.get('.paginationBttns li')
            .should('not.exist')
        
    })
    
    it.only('valida paginacao com 8 perfis', () => {

        const resultadoEsperado = ['<', '1', '2', '>']
        
        cy.intercept('GET', '/api/profile', { fixture: 'paginacao_8_usuarios'})

        cy.visit('/perfis')

        cy.get('.paginationBttns li')
            .each((el, i) => {

                cy.wrap(el)
                    .should('have.text', resultadoEsperado[i])
            }) // o professor fez com 63 e 64 perfis - ver no git ou na aula - MUITO INTERESSANTE!!!
        
    })
    
})