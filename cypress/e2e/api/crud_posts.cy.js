describe('CRUD - Posts', () => {

    let postId = ''
    let mensagem = 'Esse post foi feito pelo Cypress'

    beforeEach(() => {
        
        cy.request({
            method: 'POST',
            url:'/api/auth',
            body: {
                email: Cypress.env('email'), //para ocultar dados sensiveis (variável de ambiente)
                password: Cypress.env('password') //o comando Cypress e não é cy pq queremos acessar a ferramenta e não só um comando
            }
        })
    })
    
    it('cria um post', () => {


        cy.request({
            method: 'POST',
            url: '/api/posts',
            body: {
                text: mensagem
            }
        }).then(({ status, body }) => {
            expect(status).to.eq(201)
            expect(body.text).to.eq(mensagem)
            postId = body._id
        })
        
    })

    it('ler o post', () => {

        cy.request({
            method: 'GET',
            url: `/api/posts/${postId}`
        }).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body.text).to.eq(mensagem)
            expect(body.likes).to.have.lengthOf(0)
        })
    })

    it('atualiza o post', () => {

        cy.request({
            method: 'PUT',
            url: `/api/posts/like/${postId}`
        }).then(({ status }) => {
            expect(status).to.eq(200)

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`
            }).then(({ body }) => {
                expect(body.likes).to.have.lengthOf(1)
            })
        })   
             
    })

    it('deleta post', () => {

        cy.request({
            method: 'DELETE',
            url: `/api/posts/${postId}`
        }).then(({ status, body }) => {
            expect(status).to.eq(200) 
            expect(body.msg).to.eq('Post removido')

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`,
                failOnStatusCode: false
            }).then(({ status }) => {
                expect(status).to.eq(404)
            })
        })             
    })
})