const getSearchInput = () => {
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

const loadPhones = phones => {
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
                <a  onclick="getDetails(${phone.slug})" class="btn btn-primary">Show Details</a>
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
                    <a  onclick="getDetails('${phones[i].slug}')" class="btn btn-primary">Show Details</a>
                    </div>
                </div>
                `;
                showcase.appendChild(div);


            i++;
        }

        
    }
    }


const getDetails = slug => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => loadDetails(data) );

}

const loadDetails = data => {
    const details = document.getElementById("details");
    details.textContent = "";


    const div = document.createElement('div');
    div.classList.add("details");
    div.innerHTML = `
    <img class="d-block mx-auto mb-4" src="${data.data.image}" alt="" width="250" height="250">
    <h4 class="">${data.data.name}</h4>
    <p><b>Release date</b>: ${data.data.releaseDate ? data.data.releaseDate : "Release date not found" }</p>
    <ul>
        <li><b>Storage</b>: ${data.data.mainFeatures.storage}</li>
        <li><b>Display size</b>: ${data.data.mainFeatures.displaySize}</li>
        <li><b>Chipset</b>: ${data.data.mainFeatures.chipSet}</li>
        <li><b>Memory</b>: ${data.data.mainFeatures.memory}</li>
    </ul>
    <p><b>Sensors</b>: ${data.data.mainFeatures.sensors}</p>
    <div style="border:1px solid grey; width:70%; margin:auto;"><b>Others</b>:
    <ul>
        <li><b>WLAN</b>: ${data.data.others.WLAN}</li>
        <li><b>Bluetooth</b>: ${data.data.others.Bluetooth}</li>
        <li><b>GPS</b>: ${data.data.others.GPS}</li>
        <li><b>NFC</b>: ${data.data.others.NFC}</li>
        <li><b>Radio</b>: ${data.data.others.Radio}</li>
        <li><b>USB</b>: ${data.data.others.USB}</li>
    </ul>
    </div>
    `;
    details.appendChild(div);
}