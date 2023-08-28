const arr = [
    {
        id:0,
        category:0,
        title:"Pc",
        price:900,
        qnt:2,
    },
    {
        id:1,
        category:1,
        title:"Phone",
        price:500,
        qnt:1,
    },
    {
        id:2,
        category:0,
        title:"Laptot",
        price:700,
        qnt:3,
    }
]
  
 
/**
 * get total price according to category
 * @param {[object]} array cart array
 * @param {number} category id of selected category
 * @param {number} [initialValue] inizial value for reduce function, default: `0`
 * @returns {number} total price of selected products
 */
const getPrice = (array,category,initialValue = 0) => {
    const errors = [];

    if (!Array.isArray(array)) errors.push({param:"array",expected:"array",given:typeof array}) ;
    if (typeof category !== "number") errors.push({param:"category",expected:"number",given:typeof category});
    if (typeof initialValue !== "number") errors.push ({param:"initialValue", expected:"number",given:typeof initialValue})

    const _formatErrors = () => {
        if (errors.length === 1) return `${errors[0].param} must be a valid ${errors[0].expected}, given ${errors[0].given}`;
        else {
            return errors.map((item) => `${item.param} must be a valid ${item.expected}, given ${item.given}`).join(" and ");            
        }
    }

    if (errors.length > 0) throw new Error(_formatErrors());

  return array.filter((item) =>{
    return item.category === category;
   }).reduce((acc,curr) =>{
    return acc + (curr.price * curr.qnt)
   },initialValue)
 }
 
 console.log(getPrice(arr,0,1000))