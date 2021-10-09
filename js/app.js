// classes
class UI {
    // show and hide relatives to planet
    showPlanet(planet) {
        // check value
        if (planet === "earth") {
            // reset tags
            form.reset()

            // show and hide relatives
            document.querySelector("#earth-tags").style.display = "grid"
            document.querySelector("#march-tags").style.display = "none"
        } else if (planet === "march") {
            // reset tags
            form.reset()

            // select march as default
            document.querySelector("#march-option").selected = true

            // show and hide relatives
            document.querySelector("#march-tags").style.display = "grid"
            document.querySelector("#earth-tags").style.display = "none"
            document.querySelector("#date-label").style.display = "none"
            document.querySelector("#date").style.display = "none"
            document.querySelector("#start-label").style.display = "none"
            document.querySelector("#start-date").style.display = "none"
            document.querySelector("#end-label").style.display = "none"
            document.querySelector("#end-date").style.display = "none"

        }
    }

    // validate fields
    validateFields(planet, dateButton, startButton, date, start, end, sol, cam, page) {
        // check for planets and then for relative firelds
        if (planet === "earth") {
            if (dateButton === false && startButton === false) {
                // print error
                this.printError("Choose Date or Start and End Date!")
                return false
            } else if (dateButton === true && date === "") {
                // print error
                this.printError("Fill in Date!")
                return false
            } else if (startButton === true && start === "") {
                // print error
                this.printError("Fill in Start Date!")
                return false
            } else if (startButton === true && end === "") {
                // print error
                this.printError("Fill in End Date!")
                return false
            } else {
                return true
            }
        } else if (planet === "march") {
            if (sol === "" || sol <= 0 || sol.includes("-", "*", "/", "+", "=", "%")) {
                // print error
                this.printError("Fill in sol with correct Number!")
                return false
            } else if (cam === "" && page === "") {
                // print error
                this.printError("set Camera Type or Fill in page!")
                return false
            } else if (cam !== "" && page !== "") {
                // print error
                this.printError("you can only set Camera Type or Fill in page!")
                return false
            } else if (page !== "" && page <= 0 || page.includes("-", "*", "/", "+", "=", "%")) {
                // print error
                this.printError("Fill in page with correct Number!")
                return false
            } else {
                return true
            }
        }
    }
    // create card
    createCard(card) {
        // create div
        const div = document.createElement("div")
        div.classList = "col"
        div.id = "card-none"
        if (card.media_type === "image") {
            div.innerHTML = `
                <div id="card-white" class="card text-white">
                    <img src="${card.url}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-title">${card.title}</p>
                        <p class="card-text">Date: ${card.date}</p>
                        <p class="card-text">Copyright: ${card.copyright}</p>
                    </div>
                </div>
            `
        } else if (card.media_type === "video") {
            div.innerHTML = `
                <div id="card-white" class="card text-white">
                    <div class="card-body">
                    <video>This is Video and can't show</video>
                    <p class="card-title">Note: Video Can't Load!</p>
                    <p class="card-title">${card.title}</p>
                    <p class="card-text">Date: ${card.date}</p>
                    <p class="card-text">Copyright: ${card.copyright}</p>
                    <a href="${card.url}" target="_blank" class="btn btn-danger">Watch Video in YouTube</a>
                    </div>
                </div>
            `
        }

        // apend card to realtive div
        document.querySelector("#cards").appendChild(div)
    }

    // create march card
    marchCard(card) {
        // create div
        const div = document.createElement("div")
        div.classList = "col"
        div.id = "card-none"
        div.innerHTML = `
            <div id="card-white" class="card text-white">
                <img src="${card.img_src}" class="card-img-top">
                <div class="card-body">
                    <p class="card-title">Camera Name: ${card.camera.full_name}</p>
                    <p class="card-text">Earth Date: ${card.earth_date}</p>
                    <p class="card-text">Rover Name: ${card.rover.name}</p>
                    <p class="card-text">Launch Date: ${card.rover.launch_date}</p>
                    <p class="card-text">Landing Date: ${card.rover.landing_date}</p>
                    <p class="card-text">Rover Status: ${card.rover.status}</p>
                </div>
            </div>  
        `

        // apend card to realtive div
        document.querySelector("#cards").appendChild(div)
    }

    // show images
    showImage(planet, date, start, end, sol, cam, page) {
        // set api key
        const apiKey = "2aCuW02yMWRq5wCjGWF0M1aNRL7laOkNdMav9cAA"

        let url;
        // check that user choose which one
        if (planet === "earth") {
            // set base url
            url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&`
            if (date !== "") {
                url += `date=${date}`
            } else if (start !== "") {
                url += `start_date=${start}&end_date=${end}`
            }
        } else if (planet === "march") {
            // set base url
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&`
            if (cam !== "" && page !== "") {
                url += `camera=${cam}&page=${page}&`
            } else if (cam !== "" && page === "") {
                url += `camera=${cam}&`
            } else if (cam === "" && page !== "") {
                url += `page=${page}&`
            }

            // set api key for url
            url += `api_key=${apiKey}`
        }

        // send url
        fetch(url)
            .then(result => result.json())
            .then(objects => {
                // check planet
                if (planet === "earth") {
                    if (document.querySelector("#date-button").checked) {
                        // send object for method
                        this.createCard(objects)
                    } else if (document.querySelector("#start-button").checked) {
                        // get every photo
                        objects.forEach(cards => {
                            // send object for method
                            this.createCard(cards)
                        });
                    }
                } else if (planet === "march") {
                    // get photos of object
                    const array = objects.photos

                    // get every photo
                    array.forEach(photos => {
                        // send array for method
                        this.marchCard(photos)
                    });
                }
            })
    }

    // print error
    printError(message) {
        // create div
        const div = document.createElement("div")
        div.id = "fixed"
        div.innerHTML = message
        div.classList = "text-white rounded-3 mb-2 border border-2 border-warning d-flex justify-content-center align-items-center"

        // append div to body
        document.querySelector("#messages").appendChild(div)

        setTimeout(() => {
            div.remove()
        }, 3000);
    }
}

// variables
const ui = new UI()
const form = document.querySelector("#form")


// eventListeners
eventListeners()

function eventListeners() {
    // add load event to page
    document.addEventListener("DOMContentLoaded", () => {
        // get now date
        const date = new Date()
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        if (month < 10) {
            month = `0${month}`
        } else if (day < 10) {
            day = `0${day}`
        }

        // set date max attribute
        document.querySelector("#date").max = `${year}-${month}-${day}`
        document.querySelector("#start-date").max = `${year}-${month}-${day}`
        document.querySelector("#end-date").max = `${year}-${month}-${day}`
    })

    // add event to first selector
    document.querySelector("#pic-type").addEventListener("click", () => {
        // get values
        const planet = document.querySelector("#pic-type").value

        //send values
        ui.showPlanet(planet)
    })

    // add event to date button
    document.querySelector("#date-button").addEventListener("click", () => {
        // show date select
        document.querySelector("#date-label").style.display = "flex"
        document.querySelector("#date").style.display = "flex"

        // hide other buttons
        document.querySelector("#start-label").style.display = "none"
        document.querySelector("#start-date").style.display = "none"
        document.querySelector("#end-label").style.display = "none"
        document.querySelector("#end-date").style.display = "none"
    })

    // add event to start button
    document.querySelector("#start-button").addEventListener("click", () => {
        // hide other buttons
        document.querySelector("#start-label").style.display = "flex"
        document.querySelector("#start-date").style.display = "flex"
        document.querySelector("#end-label").style.display = "flex"
        document.querySelector("#end-date").style.display = "flex"

        // show date select
        document.querySelector("#date-label").style.display = "none"
        document.querySelector("#date").style.display = "none"
    })

    // add event to form
    form.addEventListener("submit", e => {
        e.preventDefault()
        console.log("02" === "2");
        // get values
        const planet = document.querySelector("#pic-type").value
        const dateButton = document.querySelector("#date-button").checked
        const startButton = document.querySelector("#start-button").checked
        const date = document.querySelector("#date").value
        const startDate = document.querySelector("#start-date").value
        const endDate = document.querySelector("#end-date").value
        const sol = document.querySelector("#sol").value
        const camType = document.querySelector("#cam-type").value
        const page = document.querySelector("#page").value

        // check and send values to methods
        if (ui.validateFields(planet, dateButton, startButton, date, startDate, endDate, sol, camType, page)) {
            // visible cards div
            document.querySelector("#cards").style.visibility = "visible"

            // send values and show image
            ui.showImage(planet, date, startDate, endDate, sol, camType, page)

            // show rload button and hide show button
            document.querySelector("#show").style.display = "none"
            document.querySelector("#reload").style.display = "grid"

            // add event to reload button
            document.querySelector("#reload").addEventListener("click", e => {
                e.preventDefault()

                // reload page
                location.reload()
            })
        }
    })
}