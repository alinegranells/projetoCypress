describe('CRUD - Posts', () => {

    before(() => {
        
        cy.request({
            method: 'POST',
            url:'/api/auth',
            body: {
                email: 'alinegranells@gmail.com',
                password: '123456'
            }
        })
    })
    
})