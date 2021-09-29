// Classes 


// every thing in the Insurance
class Insurance {
    constructor(make, year, level) {
        this.make = make,
            this.year = year,
            this.level = level
    }


    // calculateing price with the make
    calculatePrice() {
        // calculate price
        insurance.calculateWithMake();

        // show result
        htmlui.displayResult(make.value, year.value, this.level);

    }

    // calculateing price with make
    calculateWithMake() {
        // created price
        let price = 2000000;

        /*
        make: 1 ===> 206
        make: 2 ===> reno sandro
        make: 3 ===> suntafe
        */

        // calculateing price with make
        switch (make.value) {
            case "1":
                price = price * 1.25
                break;
            case "2":
                price = price * 1.48
                break;
            case "3":
                price = price * 1.78
                break;
        }

        // send price to the calculate with year
        insurance.calculateWithYear(price);
    }

    // calculate with year
    calculateWithYear(price) {

        // access to now year
        const nowYear = new Date().getFullYear() - 621;

        // calculate nowYear - user selected year
        const year = nowYear - this.year.value;

        // calculateing new price
        const newPrice = price - (((year * 3) / 100) * price)

        // send new price to level
        insurance.calculateWithLevel(newPrice)
    }

    calculateWithLevel(price) {
        // access to level value
        const inLevel = this.level;

        /*
        level basic ===>. price * 1.25
        level complate ===>. price * 1.75
        */

        // adding new price
        let newPrice;

        //calculateing new price
        if (inLevel !== "complate") {
            newPrice = price + ((10 * 1.25) / 100 * price);
        } else {
            newPrice = price + ((10 * 1.75) / 100 * price);
        }

        // convert new price to final price
        finalPrice = newPrice
    }
}


// every thing in the HTML DOM
class HTMLUI {

    // created and adding last 20 years to html
    createdYearOption() {
        // access to no year
        let nowYear = new Date().toLocaleDateString();

        // converting persian numbers to english number 
        let
            persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
            arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
            fixNumbers = function (str) {
                if (typeof str === 'string') {
                    for (var i = 0; i < 10; i++) {
                        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                    }
                }
                return str;
            };

        // sliceing nowYear and convert to english number
        const max = fixNumbers(nowYear.slice(0, 4));

        // access to min || last 20 year
        const min = max - 20;
        // access to the select box 
        const selectBox = document.querySelector("#year");

        // created option tags
        for (let i = max; i >= min; i--) {
            // created <option>
            const option = document.createElement("option");

            // adding values to option
            option.innerText = i;
            option.value = i;

            //apppend option to selectBox
            selectBox.appendChild(option);
        }

    }

    // display Error
    displayError(err) {
        // access to the warning DIV
        const warningDiv = document.querySelector("#warning");

        // created <p> tag
        const p = document.createElement("p");

        if (warningDiv.firstElementChild == null) {
            p.innerHTML = err
        }

        // append p to the warning Div
        warningDiv.appendChild(p);

        // show warning 
        warningDiv.classList.add("active");

        // hidden warning div after 4s
        setTimeout(() => {
            warningDiv.classList.remove("active");
        }, 4000);

    }


    // show result
    displayResult(make, year, level) {
        // access to make
        switch (make) {
            case "1":
                make = "پژو 206"
                break;
            case "2":
                make = "رنو ساندرو"
                break;
            case "3":
                make = "هیوندای سانتافه"
                break;
        }

        // access to level
        switch (level) {
            case "basic":
                level = "ساده، فقط بدنه"
                break;
            case "complate":
                level = "کامل، بدنه و شخص ثالث"
                break;
        }

        //access to the loading div
        const loading = document.querySelector("#loader img");

        // show spinner
        loading.classList.add("active");



        // access to result DIV
        const resultDiv = document.querySelector("#result");

        if (resultDiv.firstElementChild !== null) {
            resultDiv.firstElementChild.remove();
        }

        // created p tag for show result
        let p = document.createElement("p");
        // created html template
        p.innerHTML = `
        <p class="result-header">خلاصه فاکتور</p>
        <p>مدل ماشین: ${make}</p>
        <p>سال ساخت: ${year}</p>
        <p>نوع بیمه: ${level}</p>
        <br>
        <p>قیمت نهایی بیمه: <span class="font-weight-bold">${finalPrice} تومان</span></p>
        <button type='button' class="rental-car">تایید نهایی</button>
        `

        // show result and hidden spinner after 5s
        setTimeout(() => {
            // hidden spinner 
            loading.classList.remove("active")
            // show result
            resultDiv.appendChild(p)
        }, 3000);
    }
}
