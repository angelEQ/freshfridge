import React, { useState } from 'react';

const AddItem = ({setFetched}) => {
  const [itemName, setItemName] = useState("");   // item name
  const [priority, setPriority] = useState(null);    // priority
  const [shareability, setShareability] = useState(false);    // shareable
  const [assignedList, setAssignedList] = useState("grocery");    // which list to add it to

  // click handler: initiates an http request to send the new item's information to the database
  const submit = () => {
    console.log('Form input: ', itemName, priority, shareability, assignedList);

    fetch('/lists/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: itemName,
        location: assignedList,
        priority,
        shared: shareability
      })
    }).then((res) => res.json())
      .then((data) => {
        setFetched(false);
        console.log('Response to AddItem.jsx PUT: ', data);
    }).catch((error) => console.log('ERR at AddItem.jsx PUT: ', error));
  }

  return (
    <div className='addItemContainer'>
      <h2>Add an Item</h2>
      <div>
      <input type="text" 
            placeholder="item" 
            value={itemName} 
            onChange={(event) => setItemName(event.target.value)} required></input>

      <select id="add-item-select" className='dropdown' defaultValue={null} onChange={(event) => setPriority(event.target.value)}>
        <option value={null}>priority (optional)</option>
        <option value={1}>high</option>
        <option value={2}>medium</option>
        <option value={3}>low</option>
      </select>

      <label><input type="checkbox" value={shareability} onChange={(event) => setShareability(event.target.value)}></input>shareable?</label>

      <select id="add-item-select" className='dropdown' defaultValue={assignedList} onChange={(event) => setAssignedList(event.target.value)} required>
        <option value="" disabled>add to: </option>
        <option value="fridge">fridge</option>
        <option value="grocery">grocery</option>
      </select>

      <button onClick={submit}>Add</button>
      </div>
    </div>
  )
};

export default AddItem;