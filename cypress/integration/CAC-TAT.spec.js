/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preencher os campos obrigatorios e envia o formulario', function(){
    const longText = 'Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste'
    cy.get('#firstName').type('Walmir')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@exemplo.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })

  it('exibi mensagem de erro ao submeter o formulario com um email com formatacao invalida', function(){
    cy.get('#firstName').type('Walmir')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@exemplo,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor nao numerico', function(){
    cy.get('#phone').type('abcdefghijkl').should('have.value','')
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulario', function(){
    cy.get('#firstName').type('Walmir')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
})