const navCount = document.querySelectorAll('.nav-list a');
const stepsCount = document.querySelectorAll('.steps');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
const toggle = document.querySelector('.toggle');
const roller = document.querySelector('.roller');
const monthlyToggle = document.querySelector('.monthly');
const monthlyPlanToggle = document.querySelectorAll('.monthly-plan');
const yearlyPlanToggle = document.querySelectorAll('.yearly-plan');
const yearlyToggle = document.querySelector('.yearly');
const confirmBtn = document.querySelector('.confirm');
const thanks = document.querySelector('.step5');
const summary = document.querySelector('.summary');
const selectedPlan = document.querySelector('.selected-plan');
const addons = document.querySelectorAll('.step3 label input');
const addonplans = document.querySelector('.addon-plan')
const totalamount = document.querySelector('.total-amount');
const plans = document.getElementsByName('plans');
const endly = document.createElement('span');
endly.setAttribute('class',"endly");
const changeplan = document.createElement('a');
changeplan.setAttribute('href','#changeplan');
changeplan.setAttribute('class','changeplan');
changeplan.textContent="change";
const formemail = document.querySelector('input[type="email"]');
formemail.value="";
let span = document.createElement('span');
span.style.display = "none";
formemail.parentElement.appendChild(span);
navCount[0].style.backgroundColor = "hsl(206, 94%, 87%)";
stepsCount[0].style.display = "flex";
back.style.visibility = "hidden";
let addontotal = 0;
let j = 0;

var check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


next.addEventListener('click', () => {
    if((check.test(formemail.value)==true)&& (formemail.value!="")){
    j++;
    }else {
        span.style.display = "inline-block";
        span.textContent = "**Not valid email";
        formemail.addEventListener('click',()=>{
            formemail.value="";
            span.remove();
        })
    }    
    for (let i = 1; i < navCount.length; i++) {
        if (i == j) {
            if(i==3) {
                next.classList.toggle('next-toggle');
                confirmBtn.classList.toggle('confirm-toggle');
                if(monthlyToggle.classList.contains("monthly-toggle")){
                    endly.textContent = "(yearly)";
                    if(selectedPlan.hasChildNodes()){
                    selectedPlan.lastElementChild.firstElementChild.appendChild(endly);
                    selectedPlan.lastElementChild.firstElementChild.appendChild(changeplan);
                    totalamount.textContent = `$${selectedPlan.querySelector('.yearly-plan .amount').textContent}/yr`;
                    }
                    addonplans.querySelectorAll('.yearly-plan .amount').forEach(ylamt=>{
                        addontotal = Number(addontotal) + Number(ylamt.textContent);
                        if(selectedPlan.hasChildNodes()){
                        totalamount.textContent = `$${Number(addontotal) + Number(selectedPlan.querySelector('.yearly-plan .amount').textContent)}/yr`;
                        }else {
                            totalamount.textContent = `$${addontotal}/yr`;
                        }
                    })

            
                }else{
                    endly.textContent = "(monthly)";
                    if(selectedPlan.hasChildNodes()){
                    selectedPlan.lastElementChild.firstElementChild.appendChild(endly);
                    selectedPlan.lastElementChild.firstElementChild.appendChild(changeplan);
                    totalamount.textContent = `$${selectedPlan.querySelector('.monthly-plan .amount').textContent}/mo`;
                    }
                    addonplans.querySelectorAll('.monthly-plan .amount').forEach(mlamt=>{
                        addontotal = addontotal + Number(mlamt.textContent);
                        if(selectedPlan.hasChildNodes()){
                        totalamount.textContent = `$${Number(addontotal) + Number(selectedPlan.querySelector('.monthly-plan .amount').textContent)}/mo`;
                        }else {
                            totalamount.textContent = `$${addontotal}/mo`;
                        }
                    })
                }
            }
            back.style.visibility = "visible";
            navCount[i].style.backgroundColor = "hsl(206, 94%, 87%)";
            navCount[0].style.backgroundColor = "transparent";
            stepsCount[0].style.display = "none";
            stepsCount[i].style.display = "block";
        } else {
            navCount[i].style.backgroundColor = "transparent";
            stepsCount[i].style.display="none";
        }
    }
})

back.addEventListener('click',()=>{
    j--;
    if((j<0) || (j==0)){
        j=0;
        back.style.visibility = "hidden";
    }
    for(let i=0; i<navCount.length; i++) {
        if(i==j) {
            addontotal = 0;
            navCount[i].style.backgroundColor = "hsl(206, 94%, 87%)";
            stepsCount[i].style.display = "flex";
            next.classList.remove('next-toggle');
            confirmBtn.classList.remove('confirm-toggle');
            if(i==1){
                monthlyPlanToggle.forEach(mpt=>{
                    mpt.classList.remove('monthly-plan-toggle');
                })
                yearlyToggle.classList.remove('yearly-toggle');
                yearlyPlanToggle.forEach(ypt=>{
                    ypt.classList.remove('yearly-plan-toggle');
                })
                monthlyToggle.classList.remove('monthly-toggle');
        }

            addons.forEach(ad=>{
                ad.checked=false;
                while(addonplans.hasChildNodes()){
                    addonplans.lastElementChild.remove();
                    totalamount.textContent="";
                }
            })

            if(selectedPlan.hasChildNodes()) {
                selectedPlan.lastElementChild.remove();
                totalamount.textContent = "";
            }

            plans.forEach(pl=>{
                pl.checked = false;
            })

            roller.classList.remove('roller-toggle');
        }else {
            navCount[i].style.backgroundColor = "transparent";
            stepsCount[i].style.display = "none";
        }
    }
})


toggle.addEventListener('click',()=>{
    totalamount.textContent = '';
    plans.forEach(pl=>{
        pl.checked=false;
        if(selectedPlan.hasChildNodes()){
        selectedPlan.lastElementChild.remove();
        }
    })
    roller.classList.toggle('roller-toggle');
    monthlyToggle.classList.toggle('monthly-toggle');
    monthlyPlanToggle.forEach(mpt=>{
        mpt.classList.toggle('monthly-plan-toggle');
    })
    yearlyToggle.classList.toggle('yearly-toggle');
    yearlyPlanToggle.forEach(ypt=>{
        ypt.classList.toggle('yearly-plan-toggle');
    })
})


plans.forEach(plan => {
    plan.checked = false;
    plan.addEventListener('click', () => {
        if (plan.checked) {
            plan.parentElement.style.backgroundColor = "hsl(217, 100%, 97%)";
            plan.parentElement.style.borderColor="hsl(243, 100%, 62%)"
            if(!selectedPlan.hasChildNodes()){
                selectedPlan.appendChild(plan.parentElement.lastElementChild.cloneNode(true));
            }else {
                selectedPlan.lastElementChild.remove();
                selectedPlan.appendChild(plan.parentElement.lastElementChild.cloneNode(true));
            } 
        }else {
            plan.parentElement.style.backgroundColor = "transparent";
        }
    })
    plan.addEventListener('blur',()=>{
        plan.parentElement.style.backgroundColor = "transparent";
        plan.parentElement.style.borderColor = "hsl(231, 11%, 63%)"
    })
})

confirmBtn.addEventListener('click',()=>{
    stepsCount[j].style.display = "none";
    navCount[j].style.backgroundColor = "transparent";
    thanks.style.display = "flex";
    confirmBtn.parentElement.style.display = "none";
})


addons.forEach(ad=>{
    ad.checked = false;
    ad.addEventListener('click',()=>{
        if(ad.checked) {
            addonplans.appendChild(ad.parentElement.lastElementChild.cloneNode(true));
        }else {
            for(let i = 0; i<addonplans.childElementCount;i++) {
                if(addonplans.children[i].isEqualNode(ad.parentElement.lastElementChild)) {
                    addonplans.removeChild(addonplans.children[i]);
                }
            }
        }
    })
})


changeplan.addEventListener('click',()=>{
    j=1;
    addontotal=0;
    for(let i=0; i<navCount.length; i++) {
        if(i==j) {
            navCount[i].style.backgroundColor="hsl(206, 94%, 87%)";
            stepsCount[i].style.display = "flex";
            confirmBtn.style.display = "none";
            addons.forEach(ad=>{
                ad.checked = false;
                while(addonplans.hasChildNodes()) {
                    addonplans.removeChild(addonplans.lastElementChild);
                }
            })
        }else {
            navCount[i].style.backgroundColor="transparent";
            stepsCount[i].style.display = "none";
            next.style.display ="block";
        }
    }
})
