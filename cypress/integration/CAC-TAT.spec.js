// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function(){
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'quero ajuda no teste por favor.. mas voce ja esta estudando? Preenche os campos obrigatórios e envia o formulário'
        cy.get('#firstName').type('Julia')
        cy.get('#lastName').type('Kreling')
        cy.get('#email').type('julia@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Julia')
        cy.get('#lastName').type('Kreling')
        cy.get('#email').type('juliaemail,com')
        cy.get('#open-text-area').type('mensagem apenas de teste', {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('validar se campo telefone apenas aceita numero', function(){
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#phone-checkbox').check()
        cy.get('#firstName').type('Julia')
        cy.get('#lastName').type('Kreling')
        cy.get('#email').type('julia@email.com')
        cy.get('#open-text-area').type('mensagem teste', {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Julia')
            .should('have.value', 'Julia')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Kreling')
            .should('have.value', 'Kreling')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('julia@email.com')
            .should('have.value', 'julia@email.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('991567890')
            .should('have.value', '991567890')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('usa cy.contains', function(){
        cy.get('#firstName').type('Julia')
        cy.get('#lastName').type('Kreling')
        cy.get('#email').type('julia@email.com')
        cy.get('#open-text-area').type('texto de exemplo....', {delay: 0})
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@arquivoExemplo')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#white-background').should('be.visible')
        // OU USAR O CONTAIS, QUE É PARA ACHAR TEXTOS!
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#white-background').should('be.visible')
        cy.contains('Talking About Testing').should('be.visible')
    })

  })

  