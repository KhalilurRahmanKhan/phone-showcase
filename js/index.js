function getSearchInput(){
    document.getElementById("search").classList.remove("search");
    const searchText = document.getElementById("search").value;
    if(searchText.length > 0){
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(phones => loadPhones(phones.data) );
    }
    else{
        document.getElementById("search").classList.add("search");
    }

   

    document.getElementById("search").value = "";
}

function loadPhones(phones){
    const showcase = document.getElementById("showcase");
    showcase.textContent = "";
    
    if(phones.length == 0){
        const h4 = document.createElement('h4');
        h4.innerText = "No data found" ;
        h4.classList.add("text-center");
        showcase.appendChild(h4);
    }
    else if(phones.length < 20){
        for(const phone of phones){
            const div = document.createElement('div');
            div.classList.add("col-md-4");
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" style="padding:0px 10px; height:220px">
                <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <a href="#" class="btn btn-primary">Show Details</a>
                </div>
            </div>
            `;
            showcase.appendChild(div);
        }
    }
    else{
        i=0;
        while(i<20){

                const div = document.createElement('div');
                div.classList.add("col-md-4");
                div.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${phones[i].image}" class="card-img-top" style="padding:0px 10px; height:220px">
                    <div class="card-body">
                    <h5 class="card-title">${phones[i].brand}</h5>
                    <p class="card-text">${phones[i].phone_name}</p>
                    <a href="#" class="btn btn-primary">Show Details</a>
                    </div>
                </div>
                `;
                showcase.appendChild(div);


            i++;
        }

        
    }
    }