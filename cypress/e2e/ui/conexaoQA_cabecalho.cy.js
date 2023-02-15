describe('cabeçalho da página home', () => {

    const login = (email, password) => {
        cy.login(email, password)
    }
     
    const validarMenu = (seletor, link, menu) => {

        cy.getElement(seletor)
            .should('have.attr', 'href', link)
            .and('not.have.attr', 'target', '_blank') // para não abrir a aba em nova guia
            .and('have.text', menu) // para verificar se o botao está com o nome certo
    }

    context('não logado', () => {
        
        beforeEach(() => {
            cy.visit('/')
        })

        it('valida o cabeçalho', { tags: '@flaky' }, () => {
            
            // Conexão QA
            cy.getElement('navbar-conexaoQA')
                .should('have.attr', 'href', '/')
                .and('not.have.attr', 'target', '_blank')

            // QAs
            cy.getElement('navbar-QAs')
                .should('have.attr', 'href', '/perfis')
                .and('not.have.attr', 'target', '_blank')

            // Sobre
            cy.getElement('navbar-about')
                .should('have.attr', 'href', '/sobre')
                .and('not.have.attr', 'target', '_blank')

            // Cadastrar
            cy.getElement('navbar-register')
                .should('have.attr', 'href', '/cadastrar')
                .and('not.have.attr', 'target', '_blank')

            // Login
            cy.getElement('navbar-login')
                .should('have.attr', 'href', '/login')
                .and('not.have.attr', 'target', '_blank')
        })

        it.skip('valida o cabeçalho utilizando object', () => {
            
            const menus = [
                { seletor: 'navbar-conexaoQA', link: '/' },
                { seletor: 'navbar-QAs', link: '/perfis' },
                { seletor: 'navbar-about', link: '/sobre' },
                { seletor: 'navbar-register', link: '/cadastrar' },
                { seletor: 'navbar-login', link: '/login' }
            ]

            menus.forEach(({ seletor, link }) => {
                
                validarMenu(seletor, link)
            })
        })

        ;[
            { seletor: 'navbar-conexaoQA', link: '/', menu: ' ConexãoQA' },
            { seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs' },
            { seletor: 'navbar-about', link: '/sobre', menu: 'Sobre' },
            { seletor: 'navbar-register', link: '/cadastrar', menu: 'Cadastrar' },
            { seletor: 'navbar-login', link: '/login', menu: 'Login' }
        ].forEach(({ seletor, link, menu }) => {

            it(`valida o menu ${menu} - Teste Dinâmico`, () => {
                validarMenu(seletor, link, menu)
            })
        })
    })

    context('logado', () => {

        // construindo meu estado
        beforeEach(() => {
            login(Cypress.env('email'), Cypress.env('password'))
        })
        
        beforeEach(() => {
            cy.visit('/')
        })
        
        // é comum criar um teste em branco antes, só para saber se está tudo funcionando e depois apaga
        //  it.only('teste', () => {
        //    cy.log('teste')
        // })    

        ;[
            { seletor: 'navbar-conexaoQA', link: '/', menu: ' ConexãoQA' },
            { seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs' },
            { seletor: 'navbar-posts', link: '/posts', menu: 'Posts' },
            { seletor: 'navbar-dashboard', link: '/dashboard', menu: ' Dashboard' },
            { seletor: 'navbar-about', link: '/sobre', menu: 'Sobre' },
            { seletor: 'navbar-logout', link: '/', menu: ' Sair' },
        ].forEach(({ seletor, link, menu }) => {
            
            it.only(`valida o menu ${menu} - Teste Dinamico`, () => {
                
                validarMenu(seletor, link, menu)
            })
             
        })
    })    
})