import { fetchPlaceholders,getMetadata } from '../../scripts/aem.js';
const placeholders = await fetchPlaceholders(getMetadata("locale"));
console.log(placeholders);
const { fnameKey,lnameKey,roleKey,orgKey,cntryKey,headerauthorDetails,firstName,lastName,occupation,bio,topics} = placeholders;
let authorRow=document.createElement("tr");
let authorCol=document.createElement("th");authorCol.appendChild(document.createTextNode(header));
authorCol.colSpan=2;
authorRow.append(authorCol);

let firstNameRow=document.createElement("tr);
let firstNameColl=document.createElement("td");firstNameCol1.appendChild(document.createTextNode(fnamekey));
let firstNameCo12=document.createElement("id");firstNaneCo12.appendChild(document.createTestNode(firstName));
firstNameRow.append(firstNameColl);  firstNameRow.append(firstNameCo12);

let lirstNameRow=document.createElement("tr);
let lirstNameColl=document.createElement("td");lirstNameCol1.appendChild(document.createTextNode(lnamekey));
let lirstNameCo12=document.createElement("id");lirstNaneCo12.appendChild(document.createTestNode(lirstName));
lirstNameRow.append(lirstNameColl);  lirstNameRow.append(lirstNameCo12);

let roleRow=document.createElement("tr);
let roleColl=document.createElement("td");roleCol1.appendChild(document.createTextNode(rolekey));
let roleCo12=document.createElement("id");roleCo12.appendChild(document.createTestNode(role));
roleRow.append(roleColl);  roleRow.append(roleCo12);

let orgRow=document.createElement("tr);
let orgColl=document.createElement("td");orgCol1.appendChild(document.createTextNode(orgkey));
let orgCo12=document.createElement("id");orgCo12.appendChild(document.createTestNode(org));
orgRow.append(orgColl);  orgRow.append(orgCo12);

table.append(authorRow);
table.append(firstNameRow);
table.append(lirstNameRow);
table.append(roleRow);
table.append(orgRow);

export default function decorate(block) {
    const headingDiv=document.createElement('div');
    headingDiv.classList.add("table-heading");
    const htext=document.createTextNode(authorDetails);
    const headingH1=document.createElement('h1');
    headingH1.append(htext);
    headingDiv.append(headingH1);
    
    const table = document.createElement('table');
    let tr=document.createElement("tr");
    //let ad=document.createElement("th");ad.appendChild(document.createTextNode(authorDetails));tr.append(ad);
    let fn=document.createElement("th");fn.appendChild(document.createTextNode(firstName));tr.append(fn);
    let ln=document.createElement("th");ln.appendChild(document.createTextNode(lastName));tr.append(ln);
    let oc=document.createElement("th");oc.appendChild(document.createTextNode(occupation));tr.append(oc);
    let bi=document.createElement("th");bi.appendChild(document.createTextNode(bio));tr.append(bi);
    let to=document.createElement("th");to.appendChild(document.createTextNode(topics));tr.append(to);
    table.append(tr);
    [...block.children].forEach((row,r) => {
       let trow=document.createElement("tr");  
      [...row.children].forEach((col,c) => {
        console.log(" Row : Col  ",r,c);
        let tcol=document.createElement("td");
           tcol.appendChild(col);
           trow.append(tcol);
           row.replaceWith(trow);
      });
      table.append(trow);
    });
    block.append(headingDiv);
    block.append(table);
  }
  
