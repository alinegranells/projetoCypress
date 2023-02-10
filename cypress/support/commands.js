import Ajv from 'ajv'
import { get } from 'cypress/types/jquery'
import { definitionHelper } from '../utils/schemaDefinitions'

Cypress.Commands.add('login', () => {

    cy.request({
        method: 'POST',
        url:'/api/auth',
        body: {
            email: Cypress.env('email'), // para ocultar dados sensiveis (variável de ambiente)
            password: Cypress.env('password') // o comando Cypress e não é cy pq queremos acessar a ferramenta e não só um comando
        }
    })

})

Cypress.Commands.add('testeContrato', (schema, resposta) => {

    // Função que mostra os erros
    const getSchemaError = () => {
        retun cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é invalido. Erro: ${ajvErros[0]['message']}`
        )
    }

    //iniciar o ajv
    const ajv = new Ajv()
    const validacao = ajv.addSchema(definitionHelper).compile(schema)
    const valido = validacao(resposta)

    // verificar se o schema passou ou falhou
    if (!valido) {
        getSchemaError(validacao.errors).then(() => {
            throw new Error(schemaError)
        }) else {
            expect(valido).to.be.true
        }
    }
})