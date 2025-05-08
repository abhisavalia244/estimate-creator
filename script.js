/*************************************************************************
 *  101 Doors & Windows – Estimate Generator (with nested dropdowns)
 *************************************************************************/

//
// ─────────────────  PRODUCT CATALOG  ─────────────────
//   Keys must match the checkbox `value` attributes.
//   Each image lives at images/<key>.jpg
//
const catalog = {
  /* ----- Door Styles ----- */
  doorStyles: {
    // Fineline
    alki:                { name: 'Alki (Fineline)',                image: 'images/alki.jpg' },
    berkley:            { name: 'Berkley (Fineline)',            image: 'images/berkley.jpg' },
    denman:              { name: 'Denman (Fineline)',              image: 'images/denman.jpg' },
    laurelhurst:         { name: 'Laurelhurst (Fineline)',         image: 'images/laurelhurst.jpg' },
    montlake:            { name: 'Montlake (Fineline)',            image: 'images/montlake.jpg' },
    parkrose:            { name: 'Parkrose (Fineline)',            image: 'images/parkrose.jpg' },
    robson:              { name: 'Robson (Fineline)',              image: 'images/robson.jpg' },
    granville:           { name: 'Granville (Fineline)',           image: 'images/granville.jpg' },
    ravenna:             { name: 'Ravenna (Fineline)',             image: 'images/ravenna.jpg' },
    ballard:             { name: 'Ballard (Fineline)',             image: 'images/ballard.jpg' },
    fairview:            { name: 'Fairview (Fineline)',            image: 'images/fairview.jpg' },

    // Flat Panels
    mercer:              { name: 'Mercer (Flat Panel)',            image: 'images/mercer.jpg' },
    whitman:             { name: 'Whitman (Flat Panel)',           image: 'images/whitman.jpg' },
    aberdeen:            { name: 'Aberdeen (Flat Panel)',          image: 'images/aberdeen.jpg' },
    yarrow:              { name: 'Yarrow (Flat Panel)',            image: 'images/yarrow.jpg' },
    winthrop:            { name: 'Winthrop (Flat Panel)',          image: 'images/winthrop.jpg' },

    // Raised Panels
    kingston:            { name: 'Kingston (Raised Panel)',        image: 'images/kingston.jpg' },
    rosario:             { name: 'Rosario (Raised Panel)',         image: 'images/rosario.jpg' },
    lopez:               { name: 'Lopez (Raised Panel)',           image: 'images/lopez.jpg' },
    benton:              { name: 'Benton (Raised Panel)',          image: 'images/benton.jpg' },
    columbia:            { name: 'Columbia (Raised Panel)',        image: 'images/columbia.jpg' },
    bonville:            { name: 'Bonville (Raised Panel)',        image: 'images/bonville.jpg' },

    // Single extra
    flushHardboard:      { name: 'Flush Hardboard',                image: 'images/flushhardboard.jpg' }
  },

  /* ----- Baseboard and Casing ----- */
  baseboard: {
    mdf423:              { name: 'MDF423 Baseboard',               image: 'images/mdf423.jpg' },
    mdf1024:             { name: 'MDF1024 Baseboard',              image: 'images/mdf1024.jpg' },
  },

  /* ----- Door Hardware (hinges & levers colours) ----- */
  doorHardware: {
    /* Entry Sets – London */
    londonEntrysetBlack:          { name: 'London Entry Set – Black',            image: 'images/londonentrysetblack.jpg' },
    londonEntrysetPolishedchrome: { name: 'London Entry Set – Polished Chrome',  image: 'images/londonentrysetpolishedchrome.jpg' },
    londonEntrysetSatinnickel:    { name: 'London Entry Set – Satin Nickel',     image: 'images/londonentrysetsatinnickel.jpg' },
  
    /* Entry Sets – Strait */
    straitHandlesetBlack:          { name: 'Strait Handleset – Black',           image: 'images/straithandlesetblack.jpg' },
    straitHandlesetPolishedchrome: { name: 'Strait Handleset – Polished Chrome', image: 'images/straithandlesetpolishedchrome.jpg' },
    straitHandlesetSatinnickel:    { name: 'Strait Handleset – Satin Nickel',    image: 'images/straithandlesetsatinnickel.jpg' },
    
    /* Entry Sets – Madera */
    maderaEntrysetBlack:           { name: 'Madera Entry Set – Black',           image: 'images/maderaentrysetblack.jpg' },
    maderaEntrysetPolishedchrome:  { name: 'Madera Entry Set – Polished Chrome', image: 'images/maderaentrysetpolishedchrome.jpg' },
    maderaEntrysetSatinnickel:     { name: 'Madera Entry Set – Satin Nickel',    image: 'images/maderaentrysetsatinnickel.jpg' },
    
    /* Entry Sets – Ashford */
    ashfordHandlesetBlack:         { name: 'Ashford Handleset – Black',          image: 'images/ashfordhandlesetblack.jpg' },
    ashfordHandlesetSatinnickel:   { name: 'Ashford Handleset – Satin Nickel',   image: 'images/ashfordhandlesetsatinnickel.jpg' },
    
    /* Entry Sets – Davos (Emtek) */
    davosEntrysetSatinnickel:      { name: 'Davos Entry Set – Satin Nickel',     image: 'images/davosentrysetsatinnickel.jpg' },
    
    /* Entry Sets – Tavaris (Weiser) */
    tavarisHandlesetBlack:         { name: 'Tavaris Handleset – Black',          image: 'images/tavarishandlesetblack.jpg' },
    tavarisHandlesetSatinnickel:   { name: 'Tavaris Handleset – Satin Nickel',   image: 'images/tavarishandlesetsatinnickel.jpg' },
    
    /* Deadbolts – Taymor Round */
    taymorRoundDeadboltBlack:         { name: 'Taymor Round Deadbolt – Black',           image: 'images/taymorrounddeadboltblack.jpg' },
    taymorRoundDeadboltPolishedchrome:{ name: 'Taymor Round Deadbolt – Polished Chrome', image: 'images/taymorrounddeadboltpolishedchrome.jpg' },
    taymorRoundDeadboltSatinnickel:   { name: 'Taymor Round Deadbolt – Satin Nickel',    image: 'images/taymorrounddeadboltsatinnickel.jpg' },
    taymorRoundDeadboltSatinchrome:   { name: 'Taymor Round Deadbolt – Satin Chrome',    image: 'images/taymorrounddeadboltsatinchrome.jpg' },
    
    /* Deadbolts – Taymor Square */
    taymorSquareDeadboltBlack:         { name: 'Taymor Square Deadbolt – Black',           image: 'images/taymorsquaredeadboltblack.jpg' },
    taymorSquareDeadboltPolishedchrome:{ name: 'Taymor Square Deadbolt – Polished Chrome', image: 'images/taymorsquaredeadboltpolishedchrome.jpg' },
    taymorSquareDeadboltSatinnickel:   { name: 'Taymor Square Deadbolt – Satin Nickel',    image: 'images/taymorsquaredeadboltsatinnickel.jpg' },
    taymorSquareDeadboltSatinchrome:   { name: 'Taymor Square Deadbolt – Satin Chrome',    image: 'images/taymorsquaredeadboltsatinchrome.jpg' },
    
    /* Deadbolts – Weiser Round */
    weiserRoundDeadboltBlack:         { name: 'Weiser Round Deadbolt – Black',           image: 'images/weiserrounddeadboltblack.jpg' },
    weiserRoundDeadboltPolishedchrome:{ name: 'Weiser Round Deadbolt – Polished Chrome', image: 'images/weiserrounddeadboltpolishedchrome.jpg' },
    weiserRoundDeadboltSatinnickel:   { name: 'Weiser Round Deadbolt – Satin Nickel',    image: 'images/weiserrounddeadboltsatinnickel.jpg' },
    weiserRoundDeadboltSatinchrome:   { name: 'Weiser Round Deadbolt – Satin Chrome',    image: 'images/weiserrounddeadboltsatinchrome.jpg' },
    
    /* Deadbolts – Weiser Square */
    weiserSquareDeadboltBlack:         { name: 'Weiser Square Deadbolt – Black',           image: 'images/weisersquaredeadboltblack.jpg' },
    weiserSquareDeadboltPolishedchrome:{ name: 'Weiser Square Deadbolt – Polished Chrome', image: 'images/weisersquaredeadboltpolishedchrome.jpg' },
    weiserSquareDeadboltSatinnickel:   { name: 'Weiser Square Deadbolt – Satin Nickel',    image: 'images/weisersquaredeadboltsatinnickel.jpg' },
    weiserSquareDeadboltSatinchrome:   { name: 'Weiser Square Deadbolt – Satin Chrome',    image: 'images/weisersquaredeadboltsatinchrome.jpg' },
    
    /* Levers – Taymor Arc Deco Round */
    taymorArcDecoRoundBlack:         { name: 'Taymor Arc Deco Round Rose – Black',           image: 'images/taymorarcdecoRoundblack.jpg' },
    taymorArcDecoRoundPolishedchrome:{ name: 'Taymor Arc Deco Round Rose – Polished Chrome', image: 'images/taymorarcdecoRoundpolishedchrome.jpg' },
    taymorArcDecoRoundSatinnickel:   { name: 'Taymor Arc Deco Round Rose – Satin Nickel',    image: 'images/taymorarcdecoRoundsatinnickel.jpg' },
    taymorArcDecoRoundSatinbrass:    { name: 'Taymor Arc Deco Round Rose – Satin Brass',     image: 'images/taymorarcdecoRoundsatinbrass.jpg' },
    
    /* Levers – Taymor Arc Deco Square */
    taymorArcDecoSquareBlack:         { name: 'Taymor Arc Deco Square Rose – Black',           image: 'images/taymorarcdecosquareblack.jpg' },
    taymorArcDecoSquarePolishedchrome:{ name: 'Taymor Arc Deco Square Rose – Polished Chrome', image: 'images/taymorarcdecosquarepolishedchrome.jpg' },
    taymorArcDecoSquareSatinnickel:   { name: 'Taymor Arc Deco Square Rose – Satin Nickel',    image: 'images/taymorarcdecosquaresatinnickel.jpg' },
    taymorArcDecoSquareSatinbrass:    { name: 'Taymor Arc Deco Square Rose – Satin Brass',     image: 'images/taymorarcdecosquaresatinbrass.jpg' },
    
    /* Levers – Taymor Britannia */
    taymorBritanniaBlack:         { name: 'Taymor Britannia – Black',           image: 'images/taymorbritanniablack.jpg' },
    taymorBritanniaPolishedchrome:{ name: 'Taymor Britannia – Polished Chrome', image: 'images/taymorbritanniapolishedchrome.jpg' },
    taymorBritanniaSatinnickel:   { name: 'Taymor Britannia – Satin Nickel',    image: 'images/taymorbritanniasatinnickel.jpg' },
    taymorBritanniaSatinbrass:    { name: 'Taymor Britannia – Satin Brass',     image: 'images/taymorbritanniasatinbrass.jpg' },
    
    /* Levers – Taymor Vega Round */
    taymorVegaRoundBlack:         { name: 'Taymor Vega Round Rose – Black',           image: 'images/taymorvegaroundblack.jpg' },
    taymorVegaRoundPolishedchrome:{ name: 'Taymor Vega Round Rose – Polished Chrome', image: 'images/taymorvegaroundpolishedchrome.jpg' },
    taymorVegaRoundSatinnickel:   { name: 'Taymor Vega Round Rose – Satin Nickel',    image: 'images/taymorvegaroundsatinnickel.jpg' },
    taymorVegaRoundSatinbrass:    { name: 'Taymor Vega Round Rose – Satin Brass',     image: 'images/taymorvegaroundsatinbrass.jpg' },
    
    /* Levers – Taymor Vega Square */
    taymorVegaSquareBlack:         { name: 'Taymor Vega Square Rose – Black',           image: 'images/taymorvegasquareblack.jpg' },
    taymorVegaSquarePolishedchrome:{ name: 'Taymor Vega Square Rose – Polished Chrome', image: 'images/taymorvegasquarepolishedchrome.jpg' },
    taymorVegaSquareSatinnickel:   { name: 'Taymor Vega Square Rose – Satin Nickel',    image: 'images/taymorvegasquaresatinnickel.jpg' },
    taymorVegaSquareSatinbrass:    { name: 'Taymor Vega Square Rose – Satin Brass',     image: 'images/taymorvegasquaresatinbrass.jpg' },
    
    /* Levers – Taymor Cross Flow Round */
    taymorCrossFlowRoundBlack:         { name: 'Taymor Cross Flow Round Rose – Black',           image: 'images/taymorcrossflowroundblack.jpg' },
    taymorCrossFlowRoundPolishedchrome:{ name: 'Taymor Cross Flow Round Rose – Polished Chrome', image: 'images/taymorcrossflowroundpolishedchrome.jpg' },
    taymorCrossFlowRoundSatinnickel:   { name: 'Taymor Cross Flow Round Rose – Satin Nickel',    image: 'images/taymorcrossflowroundsatinnickel.jpg' },
    taymorCrossFlowRoundSatinbrass:    { name: 'Taymor Cross Flow Round Rose – Satin Brass',     image: 'images/taymorcrossflowroundsatinbrass.jpg' },
    
    /* Levers – Taymor Pace Line Round */
    taymorPaceLineRoundBlack:         { name: 'Taymor Pace Line Round Rose – Black',           image: 'images/taymorpacelineroundblack.jpg' },
    taymorPaceLineRoundPolishedchrome:{ name: 'Taymor Pace Line Round Rose – Polished Chrome', image: 'images/taymorpacelineroundpolishedchrome.jpg' },
    taymorPaceLineRoundSatinnickel:   { name: 'Taymor Pace Line Round Rose – Satin Nickel',    image: 'images/taymorpacelineroundsatinnickel.jpg' },
    taymorPaceLineRoundSatinbrass:    { name: 'Taymor Pace Line Round Rose – Satin Brass',     image: 'images/taymorpacelineroundsatinbrass.jpg' },
    
    /* Levers – Taymor Pace Line Square */
    taymorPaceLineSquareBlack:         { name: 'Taymor Pace Line Square Rose – Black',           image: 'images/taymorpacelinesquareblack.jpg' },
    taymorPaceLineSquarePolishedchrome:{ name: 'Taymor Pace Line Square Rose – Polished Chrome', image: 'images/taymorpacelinesquarepolishedchrome.jpg' },
    taymorPaceLineSquareSatinnickel:   { name: 'Taymor Pace Line Square Rose – Satin Nickel',    image: 'images/taymorpacelinesquaresatinnickel.jpg' },
    taymorPaceLineSquareSatinbrass:    { name: 'Taymor Pace Line Square Rose – Satin Brass',     image: 'images/taymorpacelinesquaresatinbrass.jpg' },
    
    /* Levers – Weiser Halifax Square */
    weiserHalifaxSquareBlack:         { name: 'Weiser Halifax Square Lever – Black',           image: 'images/weiserhalifaxsquareblack.jpg' },
    weiserHalifaxSquarePolishedchrome:{ name: 'Weiser Halifax Square Lever – Polished Chrome', image: 'images/weiserhalifaxsquarepolishedchrome.jpg' },
    weiserHalifaxSquareSatinnickel:   { name: 'Weiser Halifax Square Lever – Satin Nickel',    image: 'images/weiserhalifaxsquaresatinnickel.jpg' },
    weiserHalifaxSquareSatinbrass:    { name: 'Weiser Halifax Square Lever – Satin Brass',     image: 'images/weiserhalifaxsquaresatinbrass.jpg' },
    weiserHalifaxSquareSatinchrome:   { name: 'Weiser Halifax Square Lever – Satin Chrome',    image: 'images/weiserhalifaxsquaresatinchrome.jpg' },
    
    /* Levers – Weiser Milan Round */
    weiserMilanRoundBlack:         { name: 'Weiser Milan Round Lever – Black',           image: 'images/weisermilanroundblack.jpg' },
    weiserMilanRoundPolishedchrome:{ name: 'Weiser Milan Round Lever – Polished Chrome', image: 'images/weisermilanroundpolishedchrome.jpg' },
    weiserMilanRoundSatinnickel:   { name: 'Weiser Milan Round Lever – Satin Nickel',    image: 'images/weisermilanroundsatinnickel.jpg' },
    weiserMilanRoundSatinchrome:   { name: 'Weiser Milan Round Lever – Satin Chrome',    image: 'images/weisermilanroundsatinchrome.jpg' },
    
    /* Levers – Emtek Helios */
    emtekHeliosBlack:         { name: 'Emtek Helios Lever – Black',           image: 'images/emtekheliosblack.jpg' },
    emtekHeliosPolishedchrome:{ name: 'Emtek Helios Lever – Polished Chrome', image: 'images/emtekheliospolishedchrome.jpg' },
    emtekHeliosSatinnickel:   { name: 'Emtek Helios Lever – Satin Nickel',    image: 'images/emtekheliossatinnickel.jpg' },
    emtekHeliosSatinbrass:    { name: 'Emtek Helios Lever – Satin Brass',     image: 'images/emtekheliossatinbrass.jpg' },
    emtekHeliosSatinchrome:   { name: 'Emtek Helios Lever – Satin Chrome',    image: 'images/emtekheliossatinchrome.jpg' },
    
    /* Levers – Emtek Stuttgart */
    emtekStuttgartBlack:         { name: 'Emtek Stuttgart Lever – Black',           image: 'images/emtekstuttgartblack.jpg' },
    emtekStuttgartPolishedchrome:{ name: 'Emtek Stuttgart Lever – Polished Chrome', image: 'images/emtekstuttgartpolishedchrome.jpg' },
    emtekStuttgartSatinnickel:   { name: 'Emtek Stuttgart Lever – Satin Nickel',    image: 'images/emtekstuttgartsatinnickel.jpg' },
    emtekStuttgartSatinbrass:    { name: 'Emtek Stuttgart Lever – Satin Brass',     image: 'images/emtekstuttgartsatinbrass.jpg' },
    emtekStuttgartSatinchrome:   { name: 'Emtek Stuttgart Lever – Satin Chrome',    image: 'images/emtekstuttgartsatinchrome.jpg' },
    
    /* Knobs – Barcelona */
    knobBarcelonaBlack:         { name: 'Barcelona Cabinet Knob – Black',           image: 'images/knobbarcelonablack.jpg' },
    knobBarcelonaPolishedchrome:{ name: 'Barcelona Cabinet Knob – Polished Chrome', image: 'images/knobbarcelonapolishedchrome.jpg' },
    knobBarcelonaSatinnickel:   { name: 'Barcelona Cabinet Knob – Satin Nickel',    image: 'images/knobbarcelonasatinnickel.jpg' },
    knobBarcelonaSatinchrome:   { name: 'Barcelona Cabinet Knob – Satin Chrome',    image: 'images/knobbarcelonasatinchrome.jpg' },
    
    /* Knobs – Troy */
    knobTroyBlack:         { name: 'Troy Knob – Black',           image: 'images/knobtroypblack.jpg' },
    knobTroySatinnickel:   { name: 'Troy Knob – Satin Nickel',    image: 'images/knobtroysatinnickel.jpg' },
    knobTroySatinchrome:   { name: 'Troy Knob – Satin Chrome',    image: 'images/knobtroysatinchrome.jpg' },
  
    /* Hinges – Taymor */
    hingeTaymorBlack:          { name: 'Taymor Hinge – Black',          image: 'images/hingetaymorblack.jpg' },
    hingeTaymorPolishedchrome: { name: 'Taymor Hinge – Polished Chrome',image: 'images/hingetaymorpolishedchrome.jpg' },
    hingeTaymorSatinnickel:    { name: 'Taymor Hinge – Satin Nickel',   image: 'images/hingetaymorsatinnickel.jpg' },
    hingeTaymorSatinbrass:     { name: 'Taymor Hinge – Satin Brass',    image: 'images/hingetaymorsatinbrass.jpg' },
    hingeTaymorSatinchrome:    { name: 'Taymor Hinge – Satin Chrome',   image: 'images/hingetaymorsatinchrome.jpg' },
  
    /* Hinges – Emtek */
    hingeEmtekBlack:          { name: 'Emtek Hinge – Black',          image: 'images/hingeemtekblack.jpg' },
    hingeEmtekPolishedchrome: { name: 'Emtek Hinge – Polished Chrome',image: 'images/hingeemtekpolishedchrome.jpg' },
    hingeEmtekSatinnickel:    { name: 'Emtek Hinge – Satin Nickel',   image: 'images/hingeemteksatinnickel.jpg' },
    hingeEmtekSatinbrass:     { name: 'Emtek Hinge – Satin Brass',    image: 'images/hingeemteksatinbrass.jpg' },
    hingeEmtekSatinchrome:    { name: 'Emtek Hinge – Satin Chrome',   image: 'images/hingeemteksatinchrome.jpg' }
  }
};

/* ====== Grab elements ====== */
const form           = document.getElementById("product-form");
const tableBody      = document.querySelector("#estimate-table tbody");
const generateBtn    = document.getElementById("generate-estimate");
const downloadBtn    = document.getElementById("download-pdf");
const clearBtn       = document.getElementById("clear-estimate");

/* Dropdown triggers & content */
const doorBtn   = document.getElementById("doorDropdownBtn");
const doorCont  = document.getElementById("doorDropdownContent");
const baseBtn   = document.getElementById("baseboardDropdownBtn");
const baseCont  = document.getElementById("baseboardDropdownContent");
const hwBtn     = document.getElementById("hardwareDropdownBtn");
const hwCont    = document.getElementById("hardwareDropdownContent");

/* ====== Dropdown toggles ====== */
[
  [doorBtn,  doorCont],
  [baseBtn,  baseCont],
  [hwBtn,    hwCont]
].forEach(([btn, cont]) => {
  btn.addEventListener("click", () => cont.classList.toggle("show"));
});
window.addEventListener("click", e => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach(c => c.classList.remove("show"));
  }
});

/* ====== Storage & table ====== */
let items = [];
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("estimateItems");
  if (saved) {
    items = JSON.parse(saved);
    items.forEach(addRowToTable);
  }
});

/* ====== Handle form submit ====== */
form.addEventListener("submit", e => {
  e.preventDefault();

  const getChecked = (container) =>
    Array.from(container.querySelectorAll("input:checked")).map(cb => cb.value);

  const picks = [
    ...getChecked(doorCont).map(k => catalog.doorStyles[k]),
    ...getChecked(baseCont).map(k => catalog.baseboard[k]),
    ...getChecked(hwCont).map(k => catalog.doorHardware[k])
  ];

  if (picks.length === 0) return alert("Please select at least one item.");

  picks.forEach(item => { items.push(item); addRowToTable(item); });
  localStorage.setItem("estimateItems", JSON.stringify(items));
  form.reset();
});

/* ====== Add a row ====== */
function addRowToTable(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${item.image}" alt="${item.name}"></td>
    <td>${item.name}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  tableBody.appendChild(row);
  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
    items = items.filter(i => i.name !== item.name);
    localStorage.setItem("estimateItems", JSON.stringify(items));
  });
}

/* ====== Print, Clear, Download ====== */
generateBtn.addEventListener("click", () => window.print());
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all selections?")) {
    items = [];
    tableBody.innerHTML = "";
    localStorage.removeItem("estimateItems");
  }
});

downloadBtn.addEventListener("click", async () => {
  const hide = (sel) => document.querySelectorAll(sel).forEach(el => el.style.display = 'none');
  const show = (sel) => document.querySelectorAll(sel).forEach(el => el.style.display = '');

  hide(".delete-btn");
  hide("#estimate-table th:nth-child(3)");
  hide("#estimate-table td:nth-child(3)");

  const element = document.getElementById("estimate-content");
  const canvas  = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);
  const imgH = (imgProps.height * pdfW) / imgProps.width;

  let hLeft = imgH, position = 0;
  pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
  hLeft -= pdfH;
  while (hLeft > 0) {
    position = hLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
    hLeft -= pdfH;
  }
  pdf.save("estimate.pdf");

  show(".delete-btn");
  show("#estimate-table th:nth-child(3)");
  show("#estimate-table td:nth-child(3)");
});
