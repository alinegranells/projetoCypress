describe('API - profile', () => {

    let urlPerfis = '/api/profile'

    context('todos os perfis', () => {

        it('valida API de perfis', () => {

            cy.log('Teste de texto')

            cy.request({
                method: 'GET',
                url: urlPerfis
            }).then(({ status, duration, body, headers }) => {
                expect(status).to.eq(200)
                expect(duration).to.be.lessThan(10000)
                expect(body[0].status).to.eq('Gerente de Testes')
                expect(body[0].user.name).to.eq('Pedro Guerra')
                expect(body[0].skills[0]).to.eq('Cypress')
                expect(body[0].skills).to.have.lengthOf(1)
                expect(body[0].date).to.not.be.null
                expect(headers.['x-powered-by']).to.eq('Express')
            })
        })
    })

    context('perfil especifico', () => {

        let urlPerfil = '/api/profile/user'

        it('seleciona um usuario invalido', () => {
            
            cy.request({
                method: 'GET',
                url: `${urlPerfil}/1`,
                failOnStatusCode: false
            }).then(respostaAPI => {
                expect(respostaAPI.status).to.eq(404)
                expect(respostaAPI.body.erros[0].msg).to.eq('Perfil não encontrado')
            })
        })
        
        it('valida um usuario valido', () => {
            let usuarioID = '637d72b11fb5cb0015a02258'

            cy.request({
                method: 'GET',
                url: `${urlPerfil}/${usuarioID}` //concatenar com crase e nao aspas
            }).then(({ status, body }) => {
                //expect.(status).to.eq(200)
                //expect.(body.user.name).to.eq('Pedro Guerra')
            })
        })
        it('valida um usuario válido buscando na base', () => {

            cy.request({
                method: 'GET',
                url: urlPerfis
            }).then(({ body }) => {
                
                cy.request({
                    method: 'GET',
                    url: `${url}/${body[1].user._id}`
                }).then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body.status).to.eq('Outro')
                })
            })
        })
    })
})