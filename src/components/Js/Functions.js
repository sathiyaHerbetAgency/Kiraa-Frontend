


 export const sum=(due, qty, tax)=> {
    const dueAmount = Number(due);
    const quantity = Number(qty);
    const taxAmount = Number(tax);
  
    // if (isNaN(dueAmount) || isNaN(quantity) || isNaN(taxAmount)) {
    //   console.error("Invalid input: Please provide numbers or numeric strings.");
    //   return 0; // Handle error gracefully
    // }
  
    const total = (dueAmount * quantity) + taxAmount;
    return total;
  }