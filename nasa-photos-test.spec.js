/// <reference types="cypress" />

describe("NASA Photos Test", () => {
    // cisit site before each test
    beforeEach(() => {
        cy.visit("https://erfanmashari.github.io/NASA-Photos/")
    })

    it("Earth pictures based of date", () => {
        // validate the page
        cy.get("#form")

        // choose earth
        cy.get("#pic-type").select("Earth")

        // choose pictures based of date
        cy.get("#date-button").check()

        // set date
        cy.get("#date").type("2021-11-16")

        // submit the form
        cy.contains("Show Photo").click()

        // check the cards
        cy.get("#cards").should("be.visible")
    })

    it("Earth pictures based of start and end date", () => {
        // validate the page
        cy.get("#form")

        // choose earth
        cy.get("#pic-type").select("Earth")

        // choose pictures based of start and end date
        cy.get("#start-button").check()

        // set start and end date
        cy.get("#start-date").type("2021-11-12")
        cy.get("#end-date").type("2021-11-16")

        // submit the form
        cy.contains("Show Photo").click()

        // check the cards
        cy.get("#cards").should("be.visible")
    })

    it("Mars pictures based of sol and page", () => {
        // validate the page
        cy.get("#form")

        // choose mars
        cy.get("#pic-type").select("Mars").focus()
        cy.get("#pic-type").select("Mars").focus()

        // check the page
        cy.contains("Sol")

        // type values
        cy.get("#sol").type(1000)
        cy.get("#page").type(1)

        // submit form
        cy.contains("Show Photo").click()

        // check the cards
        cy.get("#cards").should("be.visible")
    })
    
    it("Mars pictures based of sol and camera type", () => {
        // validate the page
        cy.get("#form")

        // choose mars
        cy.get("#pic-type").select("Mars").focus()
        cy.get("#pic-type").select("Mars").focus()

        // check the page
        cy.contains("Sol")

        // type values
        cy.get("#sol").type(1000)
        cy.get("#cam-type").select(1)

        // submit form
        cy.contains("Show Photo").click()

        // check the cards
        cy.get("#cards").should("be.visible")
    })
})