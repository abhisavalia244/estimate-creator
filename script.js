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
    maderaEntrysetPolishedbrass:  { name: 'Madera Entry Set – Polished Brass', image: 'images/maderaentrysetpolishedbrass.jpg' },
    maderaEntrysetSatinnickel:     { name: 'Madera Entry Set – Satin Nickel',    image: 'images/maderaentrysetsatinnickel.jpg' },
    
    /* Entry Sets – Ashford */
    ashfordHandlesetBlack:         { name: 'Ashford Handleset – Black',          image: 'images/ashfordhandlesetblack.jpg' },
    ashfordHandlesetSatinnickel:   { name: 'Ashford Handleset – Satin Nickel',   image: 'images/ashfordhandlesetsatinnickel.jpg' },
    
    /* Entry Sets – Davos (Emtek) */
    davosEntrysetSatinnickel:      { name: 'Davos Entry Set – Satin Nickel',     image: 'images/davosentrysetsatinnickel.jpg' },
    davosEntrysetBlack:            { name: 'Davos Entry Set – Black',            image: 'images/davosentrysetblack.jpg' },
    davosEntrysetPolishedchrome:   { name: 'Davos Entry Set – Polished Chrome', image: 'images/davosentrysetpolishedchrome.jpg' },

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
    
    /* Levers – Taymor Pace Line Round */
    taymorPaceLineRoundBlack:         { name: 'Taymor Pace Line Round Rose – Black',           image: 'images/taymorpacelineroundblack.jpg' },
    taymorPaceLineRoundPolishedchrome:{ name: 'Taymor Pace Line Round Rose – Polished Chrome', image: 'images/taymorpacelineroundpolishedchrome.jpg' },
    taymorPaceLineRoundSatinnickel:   { name: 'Taymor Pace Line Round Rose – Satin Nickel',    image: 'images/taymorpacelineroundsatinnickel.jpg' },
    
    /* Levers – Taymor Pace Line Square */
    taymorPaceLineSquareBlack:         { name: 'Taymor Pace Line Square Rose – Black',           image: 'images/taymorpacelinesquareblack.jpg' },
    taymorPaceLineSquarePolishedchrome:{ name: 'Taymor Pace Line Square Rose – Polished Chrome', image: 'images/taymorpacelinesquarepolishedchrome.jpg' },
    taymorPaceLineSquareSatinnickel:   { name: 'Taymor Pace Line Square Rose – Satin Nickel',    image: 'images/taymorpacelinesquaresatinnickel.jpg' },
    
    
    /* Levers – Weiser Halifax Square */
    weiserHalifaxSquareBlack:         { name: 'Weiser Halifax Square Lever – Black',           image: 'images/weiserhalifaxsquareblack.jpg' },
    weiserHalifaxSquarePolishedchrome:{ name: 'Weiser Halifax Square Lever – Polished Chrome', image: 'images/weiserhalifaxsquarepolishedchrome.jpg' },
    weiserHalifaxSquareSatinnickel:   { name: 'Weiser Halifax Square Lever – Satin Nickel',    image: 'images/weiserhalifaxsquaresatinnickel.jpg' },
    weiserHalifaxSquareSatinbrass:    { name: 'Weiser Halifax Square Lever – Satin Brass',     image: 'images/weiserhalifaxsquaresatinbrass.jpg' },
    weiserHalifaxSquareSatinchrome:   { name: 'Weiser Halifax Square Lever – Satin Chrome',    image: 'images/weiserhalifaxsquaresatinchrome.jpg' },
    
    /* Levers – Weiser Halifax Round */
    weiserHalifaxRoundBlack:         { name: 'Weiser Halifax Round Lever – Black',           image: 'images/weiserhalifaxroundblack.jpg' },
    weiserHalifaxRoundPolishedchrome:{ name: 'Weiser Halifax Round Lever – Polished Chrome', image: 'images/weiserhalifaxroundpolishedchrome.jpg' },
    weiserHalifaxRoundSatinnickel:   { name: 'Weiser Halifax Round Lever – Satin Nickel',    image: 'images/weiserhalifaxroundsatinnickel.jpg' }, 
    

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

    
    /* Levers – Emtek Stuttgart */
    emtekStuttgartBlack:         { name: 'Emtek Stuttgart Lever – Black',           image: 'images/emtekstuttgartblack.jpg' },
    emtekStuttgartPolishedchrome:{ name: 'Emtek Stuttgart Lever – Polished Chrome', image: 'images/emtekstuttgartpolishedchrome.jpg' },
    emtekStuttgartSatinnickel:   { name: 'Emtek Stuttgart Lever – Satin Nickel',    image: 'images/emtekstuttgartsatinnickel.jpg' },
    emtekStuttgartSatinbrass:    { name: 'Emtek Stuttgart Lever – Satin Brass',     image: 'images/emtekstuttgartsatinbrass.jpg' },

    
    /* Knobs – Barcelona */
    knobBarcelonaBlack:         { name: 'Barcelona Cabinet Knob – Black',           image: 'images/knobbarcelonablack.jpg' },
    knobBarcelonaSatinnickel:   { name: 'Barcelona Cabinet Knob – Satin Nickel',    image: 'images/knobbarcelonasatinnickel.jpg' },
    knobBarcelonaSatinbrass:   { name: 'Barcelona Cabinet Knob – Satin Brass',    image: 'images/knobbarcelonasatinbrass.jpg' },
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
const submitBtn      = document.getElementById("add-selection-btn");

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
  } else {
    // Initialize empty state
    updateTotals();
  }
  
  // Set the estimate date fields
  setEstimateDates();
  
  // Make the estimate details editable
  setupEditableFields();
});

/* ====== Set default date for estimate ====== */
function setEstimateDates() {
  // Only set a default date if the field is empty
  if (document.getElementById('estimate-date').textContent.trim() === '') {
    const now = new Date();
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString('en-US', dateFormatOptions);
    document.getElementById('estimate-date').textContent = currentDate;
  }
  
  // We don't auto-generate the estimate number anymore as it's editable
}

/* ====== Setup editable customer fields ====== */
function setupEditableFields() {
  // Load any saved customer details from localStorage
  const savedDetails = localStorage.getItem("estimateDetails");
  if (savedDetails) {
    const details = JSON.parse(savedDetails);
    // Set customer details
    document.getElementById('customer-name').textContent = details.name || 'Client Name';
    document.getElementById('project-name').textContent = details.project || 'Interior Door Replacement';
    document.getElementById('project-address').textContent = details.address || 'Customer Address';
    
    // Set estimate details if they exist
    if (details.estimateNumber) {
      document.getElementById('estimate-number').textContent = details.estimateNumber;
    }
    if (details.estimateDate) {
      document.getElementById('estimate-date').textContent = details.estimateDate;
    }
  }
  
  // Setup event listeners for all contenteditable elements
  const editableFields = document.querySelectorAll('[contenteditable="true"]');
  editableFields.forEach(field => {
    field.addEventListener('blur', saveEstimateDetails);
    field.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.blur();
      }
    });
  });
}

/* ====== Save all editable details to localStorage ====== */
function saveEstimateDetails() {
  const estimateDetails = {
    name: document.getElementById('customer-name').textContent,
    project: document.getElementById('project-name').textContent,
    address: document.getElementById('project-address').textContent,
    estimateNumber: document.getElementById('estimate-number').textContent,
    estimateDate: document.getElementById('estimate-date').textContent
  };
  
  localStorage.setItem("estimateDetails", JSON.stringify(estimateDetails));
}

/* ====== Handle form submit ====== */
submitBtn.addEventListener("click", e => {
  e.preventDefault();
  
  console.log("Add Selection button clicked");

  const getChecked = (container) => {
    return Array.from(container.querySelectorAll("input:checked")).map(cb => cb.value);
  }

  const doorPicks = getChecked(doorCont).map(k => catalog.doorStyles[k] || null).filter(Boolean);
  const basePicks = getChecked(baseCont).map(k => catalog.baseboard[k] || null).filter(Boolean);
  const hwPicks = getChecked(hwCont).map(k => catalog.doorHardware[k] || null).filter(Boolean);
  
  console.log("Door picks:", doorPicks.length);
  console.log("Baseboard picks:", basePicks.length);
  console.log("Hardware picks:", hwPicks.length);
  
  const picks = [...doorPicks, ...basePicks, ...hwPicks];

  if (picks.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  picks.forEach(item => { 
    console.log("Adding item:", item.name);
    items.push(item); 
    addRowToTable(item); 
  });
  
  // Reset all checkboxes
  document.querySelectorAll("#product-form input[type='checkbox']").forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Close any open dropdowns
  document.querySelectorAll(".dropdown-content").forEach(dropdown => {
    dropdown.classList.remove("show");
  });
  
  // Save items to localStorage
  localStorage.setItem("estimateItems", JSON.stringify(items));
});

/* ====== Add a row ====== */
function addRowToTable(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${item.image}" alt="${item.name}"></td>
    <td class="description-cell" title="Click to edit">${item.name}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  
  // Make the description editable on click
  const descriptionCell = row.querySelector(".description-cell");
  descriptionCell.style.cursor = "pointer";
  
  descriptionCell.addEventListener("click", function() {
    // Create input element if we're not already editing
    if (!this.querySelector("input")) {
      const currentText = this.textContent;
      this.innerHTML = `<input type="text" value="${currentText}" class="edit-description" style="width: 100%">`;
      const input = this.querySelector("input");
      input.focus();
      input.select();
      
      // Save on blur or Enter key
      input.addEventListener("blur", finishEditing);
      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          finishEditing.call(this);
        }
      });
      
      function finishEditing() {
        const newValue = this.value.trim();
        if (newValue) {
          this.parentNode.textContent = newValue;
          
          // Update the item in our items array (for localStorage)
          const index = Array.from(tableBody.children).indexOf(row);
          if (index !== -1 && items[index]) {
            // Store original name but display edited name
            if (!items[index].originalName) {
              items[index].originalName = items[index].name;
            }
            items[index].name = newValue;
            localStorage.setItem("estimateItems", JSON.stringify(items));
          }
        }
      }
    }
  });
  
  // Add delete functionality
  row.querySelector(".delete-btn").addEventListener("click", () => {
    const index = Array.from(tableBody.children).indexOf(row);
    if (index !== -1) {
      items.splice(index, 1);
      localStorage.setItem("estimateItems", JSON.stringify(items));
    }
    row.remove();
    updateTotals(); // Update totals after removing an item
  });
  
  tableBody.appendChild(row);
  updateTotals(); // Update totals after adding a new item
}

/* ====== Update tax and total calculations ====== */
function updateTotals() {
  // For demonstration, set some sample prices
  // In a real app, these would come from actual item prices
  const subtotalValue = items.length * 75.00; // Simple calculation - $75 per item
  const gstRate = 0.05; // 5% GST
  
  const gstAmount = subtotalValue * gstRate;
  const grandTotal = subtotalValue + gstAmount;
  
  // Format currency
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  
  // Update the display
  document.getElementById('subtotal').textContent = formatCurrency(subtotalValue);
  document.getElementById('gst-amount').textContent = formatCurrency(gstAmount);
  document.getElementById('total-tax').textContent = formatCurrency(gstAmount);
  document.getElementById('sales-tax-total').textContent = formatCurrency(gstAmount);
  document.getElementById('grand-total').textContent = formatCurrency(grandTotal);
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

  // Hide elements not needed in PDF
  hide(".delete-btn");
  hide("#estimate-table th:nth-child(3)");
  hide("#estimate-table td:nth-child(3)");
  hide(".actions");
  hide("#product-form");
  
  try {
    // Get customer info for the filename
    const customerName = document.getElementById('customer-name').textContent.replace(/\s+/g, '_');
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const estimateNum = document.getElementById('estimate-number').textContent;
    const filename = `Estimate_${estimateNum}_${customerName}_${date}.pdf`;
    
    // Capture the entire document in one go for better alignment
    const element = document.querySelector(".card");
    const canvas = await html2canvas(element, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    
    // Split across multiple pages if necessary
    let heightLeft = imgHeight;
    let position = 0;
    
    // First page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = -pageHeight * (imgHeight - heightLeft) / imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save the PDF
    pdf.save(filename);
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF. Please try again.");
  } finally {
    // Restore hidden elements
    show(".delete-btn");
    show("#estimate-table th:nth-child(3)");
    show("#estimate-table td:nth-child(3)");
    show(".actions");
    show("#product-form");
  }
});
