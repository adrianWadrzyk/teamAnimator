
function toggleClass () { 

    const offer_list = document.getElementsByClassName("tiles--offer");

    for(let i=0; i<offer_list.length; i++)
    offer_list[i].addEventListener("click", showList);

    function showList() { 
        let offer_list = this.getElementsByClassName("list--offer")
        offer_list[0].classList.toggle("show");
    }
};

window.onload = toggleClass;

const form = document.querySelector("#contactForm");
const inputs = document.querySelectorAll(".input, .textarea");

form.setAttribute("novalidate", true);


[...inputs].forEach(input => { 
    input.addEventListener("input",function() {
        if(!this.checkValidity()){
            this.classList.add('error');
            showErrorMessage(input);
        } else { 
            this.classList.remove("error");
            hideErrorMessage(input);
                    
        }
    })
})

const showErrorMessage = elem => { 
    if(elem.parentNode.querySelector(".errorMessage") === null)
    {
        const errorText = elem.dataset.error;
        const boxError = document.createElement("p");
        boxError.innerText  = errorText; 
        boxError.classList.add("errorMessage");
        elem.parentNode.appendChild(boxError);
    }
}
  
const hideErrorMessage = elem => { 
    if(elem.parentNode.querySelector(".errorMessage") !== null) 
       elem.parentNode.querySelector(".errorMessage").remove();
}

const checkFieldsErrors = elements => { 
    let fieldsAreValid = true;

    [...elements].forEach( elem => { 
        if(elem.checkValidity()) { 
            elem.classList.remove("error");
            hideErrorMessage(elem);
        } else { 
            elem.classList.add("error");
            showErrorMessage(elem);
            fieldsAreValid = false;
        }
    })

    return fieldsAreValid;
}

form.addEventListener("submit", e => { 
    e.preventDefault();

    if(checkFieldsErrors(inputs)) { 
        let  btn = document.querySelector(".submit_btn");
        btn.innerText = " Wysyłanie...";
        btn.setAttribute("disabled", "disabled");

        let elementsToSend = document.querySelectorAll(".input, .textarea");
        const dataToSend = new FormData();
        [...elementsToSend].forEach(el => dataToSend.append(el.name, el.value));

        const url = form.getAttribute('action');
        const method = form.getAttribute('method');
        
        let xhr = new XMLHttpRequest();

        xhr.open(method, url , true);

        xhr.addEventListener("load", function() { 
            if(this.status === 200)
            {
                btn.innerText = " Wyślij";
                btn.remove("disabled");
            } else { 
               btn.innerText = " Błąd serwera, spróbuj ponownie";
               setTimeout(function(){
               btn.innerText = " Wyślij";
               btn.removeAttribute("disabled");
            }, 3000);
            }
        })

        xhr.send(dataToSend)
    }
})


// animation for section "why us" 

const sectionWhyUs = document.getElementById("why_us");
const whyUsChildren = document.querySelectorAll(".tiles--why_us");
const headerWhyUs = document.querySelector(".why_us--header");

var onScrollHandler = () => { 
        let offsetY_WhyUs= sectionWhyUs.getBoundingClientRect().y;
    if(offsetY_WhyUs < 450)  {       
        headerWhyUs.style.animation ="jumpingScale 1.5s ease-in-out forwards";
        for (const item of whyUsChildren) {
            item.style.animation = "fadeIn 1.5s forwards 1.5s";
        }
    }
}

document.addEventListener('scroll', onScrollHandler);