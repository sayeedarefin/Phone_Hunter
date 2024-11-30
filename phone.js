const loadPhone = async(searchText= '13', isShowAll) =>{
    // const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone'); //because this is not dynamic

    //we have to use backtic and modify the api link with the original file format

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    // console.log(data);
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

//Display phones dynamically on each card

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);

    // 1. bring the main container where we want to add data dynamically, must be added before the for each loop, otherwise it will be being iterating over and over
    const phoneContainer = document.getElementById('phone-container');

    // clear the phone container cards before adding new cards
    phoneContainer.textContent='';

    //displa show all button if there are more than 10 results
    const showAllContainer = document.getElementById("show-all-container");
    if(phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove("hidden");
    }
    else{
        showAllContainer.classList.add("hidden");

    }
    // console.log('is show all', isShowAll)
 

    // display only first 10 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,10);
    }

    // check how many results are there

    // console.log(phones.length);

    phones.forEach(phone => {
        // console.log(phone);

        //2. create a div that we want to add in the main container
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`

        // 3. set inner html of that div
        phoneCard.innerHTML = `<figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;

                    // 4. append Child
                    phoneContainer.appendChild(phoneCard);
        
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//handle search button
const handleSearch =(isShowAll) =>{
    toggleLoadingSpinner(true); // show when we click the button
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value; 
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isloading) =>{
    const loadingSpinner= document.getElementById("loading-spinner");
    if(isloading){
        loadingSpinner.classList.remove("hidden");
    }
    else{
        loadingSpinner.classList.add("hidden");
    }
}
//handle show all


const handleShowAll = () =>{
    handleSearch(true);
    console.log("Show all button is hided")
}

// handle show all button
const handleShowDetails = async (id)=>{
    console.log("Clicked", id);

    // load individal single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    // console.log(data);

   
    showPhoneDetails(phone);
}

// handle modal
const showPhoneDetails = (phone) =>{

    console.log(phone);

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    // show detail container

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML =`
        <img src="${phone.image}">
        <p><span class: font-bold>Brand: </span>${phone.brand}</p>
        <p><span>storage: </span>${phone.mainFeatures.storage}</p>
        <p><span>Chipset: </span>${phone.mainFeatures.chipSet}</p>
        <p><span>Display Size: </span>${phone.mainFeatures.displaySize}</p>
        <p><span>Memory: </span>${phone.mainFeatures.memory}</p>
        <p><span>Sensors: </span>${phone.mainFeatures.sensors}</p>
        <p><span>Bluetooth: </span>${phone.others?.Bluetooth || 'No Bluetooth Availabe'}</p>
        <p><span>GPS: </span>${phone.others?.GPS || 'No GPS Available'}</p>
        <p><span>NFC: </span>${phone.others?.NFC || 'Not Available'}</p>
        <p><span>USB: </span>${phone.others?.USB || 'Not Available'}</p>
        <p><span>WLAN: </span>${phone.others?.WLAN || 'No Data Available'}</p>
        <p><span>Radio: </span>${phone.others?.Radio || 'Not Available'}</p>
        <p><span>Release Date: </span>${phone.releaseDate}</p>
    `

    //show the modal
    show_detail_modal.showModal();
    
}

loadPhone();
