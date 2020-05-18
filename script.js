async function loadData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// sorting the list
function sortList( list ) {
  list.sort( ( item1, item2 ) => {
    if( item2.name > item1.name ) {
      return -1;
    }
    else {
      return 1;
    }
  } )
}
// removing item from list
function removeFromList( list, id ) {
  list.forEach( (item,index) => {
    if( item.id == id ) {
      console.log(id);
      list.splice( index, 1 );
    }
  } )
}

// rendering the masterlist
function renderMaster( list, element ) {
  element.innerHTML = '';
  list.forEach( (item) => {
    let listItem = 
      `<li>
        ${item.name}
        <div class="toolbar">
          <button type="button"
            data-action="perishable"
            data-id="${item.id}"
            data-name="${item.name}"
            data-unit="${item.unit}" 
            data-category="${item.category}"
            data-quantity="${item.quantity}">
            Perishable
          </button>
          <button type="button"
            data-action="nonperishable"
            data-id="${item.id}"
            data-name="${item.name}"
            data-unit="${item.unit}" 
            data-category="${item.category}"
            data-quantity="${item.quantity}">
            Non Perishable
          </button>
        </div>
      </li>`;
    element.insertAdjacentHTML('beforeend', listItem);
  });
}

function renderPerishables(list,element) {
  element.innerHTML = '';
  list.forEach( (item) => {
    let listItem = 
    `<li>
      ${item.name}
      <button
        data-id="${item.id}"
        data-name="${item.name}"
        data-unit="${item.unit}" 
        data-category="${item.category}"
        data-quantity="${item.quantity}">
      Remove
      </button>
    </li>`;
    element.insertAdjacentHTML('beforeend', listItem );
  } )
}

function renderNonPerishables(list,element) {
  element.innerHTML = '';
  list.forEach( (item) => {
    let listItem = 
    `<li>
      ${item.name}
      <button
        data-id="${item.id}"
        data-name="${item.name}"
        data-unit="${item.unit}" 
        data-category="${item.category}"
        data-quantity="${item.quantity}">
      Remove
      </button>
    </li>`;
    element.insertAdjacentHTML('beforeend', listItem );
  } )
}

function storeList( key, list ) {
  
  window.localStorage.setItem( key , JSON.stringify(list) );
}

function loadList( key ) {
  list = JSON.parse( window.localStorage.getItem(key) );
  return list;
}

let masterList = new Array();
let perishablesList = new Array();
let nonperishablesList = new Array();
window.addEventListener('load', () => {
  // selectors for view
  const masterDisplay = document.querySelector('#master');
  const perishableDisplay = document.querySelector('#perishables');
  const nonperishableDisplay = document.querySelector('#non-perishables')
  // load the data
  const dataFile = 'data.json';

   // load the master data
   let storedMaster = loadList('master');
   if( storedMaster ) {
     masterList = storedMaster;
     renderMaster( masterList, masterDisplay );
   }
   else {
     loadData( dataFile )
     .then( (data) => {
       masterList = data;
       renderMaster( masterList, masterDisplay );
     })
   }
   // load the perishables
   let storedPerishables = loadList('perishables');
   if( storedPerishables ) {
     perishablesList = storedPerishables;
     renderPerishables( perishablesList, perishableDisplay );
   }
 
   // load the perishables
   let storedNonPerishables = loadList('nonperishables');
   if( storedNonPerishables ) {
     nonperishablesList = storedNonPerishables;
     renderNonPerishables( nonperishablesList, nonperishableDisplay );
   }
  
  // loadData( dataFile )
  // .then( (data) => { 
    
  //   data.forEach( (item) => {
  //     masterList.push( item );
  //   })
  //   sortList( masterList );
  //   renderMaster( masterList, masterDisplay );
  // })

  // add a click listener for master list view (masterDisplay)
  masterDisplay.addEventListener('click', (event) => {
    // get the event target's attributes
    const action = event.target.getAttribute('data-action');
    const id = event.target.getAttribute('data-id');
    const name = event.target.getAttribute('data-name');
    const unit = event.target.getAttribute('data-unit');
    const category = event.target.getAttribute('data-category');
    const quantity = event.target.getAttribute('data-quantity');
    const item = { id: id, name: name, unit: unit, category: category, quantity: quantity };

    if( action == 'perishable' ) {
      perishablesList.push(item);
      removeFromList( masterList, id );
      sortList(perishablesList);
      renderPerishables( perishablesList, perishableDisplay );
      renderMaster( masterList, masterDisplay );
      storeList('master', masterList );
      storeList('perishables', perishablesList );
    }
    if( action == 'nonperishable') {
      nonperishablesList.push(item);
      removeFromList( masterList, id );
      renderNonPerishables( nonperishablesList, nonperishableDisplay );
      renderMaster( masterList, masterDisplay );
      storeList('master', masterList );
      storeList('nonperishables', nonperishablesList );
    }
  })

  // add a click listener for perishables list view (perishableDisplay)
  perishableDisplay.addEventListener('click', (event) => {
    // get the event target's attributes
    const id = event.target.getAttribute('data-id');
    const name = event.target.getAttribute('data-name');
    const unit = event.target.getAttribute('data-unit');
    const category = event.target.getAttribute('data-category');
    const quantity = event.target.getAttribute('data-quantity');
    const item = { id: id, name: name, unit: unit, category: category, quantity: quantity };
    // remove from perishablesList
    removeFromList( perishablesList, id );
    sortList(perishablesList);
    renderPerishables( perishablesList, perishableDisplay );
    masterList.push( item );
    sortList(masterList);
    renderMaster( masterList, masterDisplay );
    storeList('master',masterList);
    storeList('perishables',perishablesList);
  })

  nonperishableDisplay.addEventListener('click', (event) => {
    // get the event target's attributes
    const id = event.target.getAttribute('data-id');
    const name = event.target.getAttribute('data-name');
    const unit = event.target.getAttribute('data-unit');
    const category = event.target.getAttribute('data-category');
    const quantity = event.target.getAttribute('data-quantity');
    const item = { id: id, name: name, unit: unit, category: category, quantity: quantity };
    // remove from perishablesList
    removeFromList( nonperishablesList, id );
    sortList(nonperishablesList);
    renderPerishables( nonperishablesList, nonperishableDisplay );
    masterList.push( item );
    sortList(masterList);
    renderMaster( masterList, masterDisplay );
    storeList('master',masterList);
    storeList('nonperishables',nonperishablesList);
  })
})

// git test