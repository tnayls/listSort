async function loadData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
  
  //sorting the lsit
  function sortlist( list ) {
    list.sort( (item1, item2) => {
      if(item2.name > item1.name ) {
        return -1
      }
      else {
        return 1;
      }
    } )
  }
  
  //rendering the masterlist
  function rednderMaster( list, element ) {
    list.forEach( (item) => {
      let listItem = `<li>
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
      <button type="button">Non Perishable</button>
      </div>
      </li>`;
      element.insertAdjacentHTML('beforeend', listItem);
    })
  }
  
  let masterList = new Array();
  let perishablesList = [];
  window.addEventListener('load', () => {
    // load the data
    const dataFile = 'data.json';
    
    
    
    loadData( dataFile )
    .then( (data) => { 
      const masterDisplay = document.querySelector('#master');
      data.forEach( (item) => {
       masterList.push( item );
      })
    sortlist( masterList);
    rednderMaster( masterList, masterDisplay )
    })
  })