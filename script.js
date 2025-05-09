// Check authentication before allowing access to the page
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const expiry = localStorage.getItem('loginExpiry');
  const currentTime = new Date().getTime();
  
  // If not logged in or login expired, redirect to login page
  if (isLoggedIn !== 'true' || !expiry || currentTime > parseInt(expiry)) {
    window.location.href = 'login.html';
    return false;
  }
  
  return true;
}

// Logout function
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  localStorage.removeItem('loginExpiry');
  window.location.href = 'login.html';
}

/*************************************************************************
 *  101 Doors & Windows – Estimate Generator (with nested dropdowns)
 *************************************************************************/

// Run auth check immediately
if (!checkAuth()) {
  throw new Error("Authentication required");
}

// Global variables
let items = [];
let isDirty = false;  // Flag to track unsaved changes

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
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    // Close any other open dropdowns first
    document.querySelectorAll(".dropdown-content.show").forEach(el => {
      if (el !== cont) el.classList.remove("show");
    });
    
    // Toggle this dropdown
    const isOpen = cont.classList.toggle("show");
    
    // If opening this dropdown, close all open sub-dropdowns
    if (isOpen) {
      cont.querySelectorAll("details").forEach(detail => {
        detail.open = false;
      });
    }
  });
});

window.addEventListener("click", e => {
  // If clicked element is not part of a dropdown or a summary element
  if (!e.target.closest(".dropdown") && !e.target.matches("summary")) {
    // Close all dropdowns
    document.querySelectorAll(".dropdown-content").forEach(c => c.classList.remove("show"));
  }
  
  // If clicked outside details but inside dropdown-content, don't close the dropdown
  if (!e.target.closest("details") && !e.target.matches("summary") && e.target.closest(".dropdown-content")) {
    e.stopPropagation(); // Prevent closing the main dropdown
  }
});

// Add event listener for details elements to prevent dropdown closing
document.querySelectorAll(".dropdown-content details").forEach(detail => {
  detail.addEventListener("click", e => {
    // If clicking on a summary element (the dropdown header)
    if (e.target.matches("summary")) {
      const clickedDetails = e.target.closest("details");
      const parent = clickedDetails.parentElement;
      
      // If this is a nested details within another details
      if (parent.closest("details")) {
        // Don't propagate to parent details to prevent them from closing
        e.stopPropagation();
      }
      
      // Close sibling details at the same level
      parent.querySelectorAll("details").forEach(otherDetail => {
        if (otherDetail !== clickedDetails && !otherDetail.contains(clickedDetails) && !clickedDetails.contains(otherDetail)) {
          otherDetail.open = false;
          
          // Also close any nested details inside this sibling
          otherDetail.querySelectorAll("details").forEach(nestedDetail => {
            nestedDetail.open = false;
          });
        }
      });
    }
    
    // Don't let clicks inside details bubble up to close main dropdown
    e.stopPropagation();
  });
});

/* ====== DOM Content Loaded ====== */
window.addEventListener("DOMContentLoaded", () => {
  try {
    // Show loading spinner or indicator
    document.body.classList.add('loading');
    
    // Test localStorage before proceeding
    if (typeof localStorage === 'undefined') {
      throw new Error('localStorage is not available');
    }
    
    // Try a test write to localStorage
    const testStorage = () => {
      const testKey = '__test_storage';
      try {
        localStorage.setItem(testKey, '1');
        if (localStorage.getItem(testKey) !== '1') {
          throw new Error('Storage test failed');
        }
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    };
    
    if (!testStorage()) {
      throw new Error('Cannot access localStorage. Please check your browser settings.');
    }
    
    // Initialize items array if not already defined
    window.items = window.items || [];
    
    // Load saved items
    const saved = localStorage.getItem("estimateItems");
    if (saved) {
      try {
        const parsedItems = JSON.parse(saved);
        if (Array.isArray(parsedItems)) {
          window.items = parsedItems;
          
          // Check if tableBody exists before adding rows
          const tableBodyEl = document.querySelector("#estimate-table tbody");
          if (tableBodyEl) {
            parsedItems.forEach(item => addRowToTable(item));
          } else {
            console.warn("Table body element not found");
          }
        } else {
          console.warn("Saved items is not an array");
        }
      } catch (parseError) {
        console.error("Error parsing saved items:", parseError);
      }
    }
    
    // Set the estimate date fields
    setEstimateDates();
    
    // Make the estimate details editable
    setupEditableFields();
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Setup browser alerts for unsaved changes
    setupUnsavedChangesAlert();
    
    // Setup default PDF filename
    setupDefaultPdfFilename();
    
    // Set the user's initials in the Rep field
    setUserInitialsInRepField();
    
  } catch (error) {
    console.error("Error initializing application:", error);
    showErrorModal("Application Error", 
      "There was an error loading the application.", 
      error.message || 'Unknown error');
  } finally {
    // Hide loading spinner
    document.body.classList.remove('loading');
  }
});

/* ====== Set default date for estimate ====== */
function setEstimateDates() {
  try {
    // Only set a default date if the field exists and is empty
    const estimateDateEl = document.getElementById('estimate-date');
    if (estimateDateEl && estimateDateEl.textContent.trim() === '') {
      const now = new Date();
      const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const currentDate = now.toLocaleDateString('en-US', dateFormatOptions);
      estimateDateEl.textContent = currentDate;
    }
    
    // Auto-generate estimate number if element exists and is empty
    const estimateNumberEl = document.getElementById('estimate-number');
    if (estimateNumberEl && estimateNumberEl.textContent.trim() === '') {
      const now = new Date();
      const estNumber = `EST-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      estimateNumberEl.textContent = estNumber;
    }
  } catch (error) {
    console.error("Error setting default dates:", error);
  }
}

/* ====== Setup editable customer fields ====== */
function setupEditableFields() {
  try {
    // Load any saved customer details from localStorage
    const savedDetails = localStorage.getItem("estimateDetails");
    if (savedDetails) {
      const details = JSON.parse(savedDetails);
      
      // Helper to safely set text content
      const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
          element.textContent = value || '';
        }
      };
      
      // Set customer details with null checks
      setTextContent('customer-name', details.name || 'Client Name');
      setTextContent('project-name', details.project || 'Interior Door Replacement');
      setTextContent('project-address', details.address || 'Customer Address');
      
      // Set estimate details if they exist
      if (details.estimateNumber) {
        setTextContent('estimate-number', details.estimateNumber);
      }
      if (details.estimateDate) {
        setTextContent('estimate-date', details.estimateDate);
      }
    }
  } catch (error) {
    console.error("Error loading customer details:", error);
  }
  
  // Setup event listeners for all contenteditable elements
  const editableFields = document.querySelectorAll('[contenteditable="true"]');
  editableFields.forEach(field => {
    if (field) {
      field.addEventListener('blur', saveEstimateDetails);
      field.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.blur();
        }
      });
      
      // Add placeholder effect
      field.addEventListener('focus', function() {
        if (this.textContent && (
          this.textContent.includes('Client') || 
          this.textContent.includes('Address') || 
          this.textContent.includes('Interior'))
        ) {
          this.textContent = '';
        }
      });
    }
  });
}

/* ====== Save all editable details to localStorage ====== */
function saveEstimateDetails() {
  try {
    // Get elements with null checks
    const customerNameEl = document.getElementById('customer-name');
    const projectNameEl = document.getElementById('project-name');
    const projectAddressEl = document.getElementById('project-address');
    const estimateNumberEl = document.getElementById('estimate-number');
    const estimateDateEl = document.getElementById('estimate-date');
    
    // Safely get text content with fallbacks
    const getName = (el) => el && el.textContent ? el.textContent : '';
    
    const estimateDetails = {
      name: getName(customerNameEl),
      project: getName(projectNameEl),
      address: getName(projectAddressEl),
      estimateNumber: getName(estimateNumberEl),
      estimateDate: getName(estimateDateEl)
    };
    
    // Check if localStorage is available
    if (typeof localStorage === 'undefined') {
      throw new Error('localStorage is not available');
    }
    
    // Check available space
    const testKey = '__test_storage_space';
    try {
      // Try to fill storage to check availability (with a safer approach)
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
    } catch (e) {
      console.warn('Storage space check: Limited space available');
    }
    
    // Try to save details with catch for errors
    localStorage.setItem("estimateDetails", JSON.stringify(estimateDetails));
    
    // Mark the document as having changes
    isDirty = true;
    
    return true;
  } catch (error) {
    console.error("Error saving estimate details:", error);
    
    // Use the shared error modal
    showErrorModal(
      "Error Saving Changes", 
      "There was an error saving your changes. Please try again.",
      error.message || 'Unknown error'
    );
    
    return false;
  }
}

/* ====== Setup keyboard shortcuts ====== */
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save/print
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      generateBtn.click();
    }
    
    // Ctrl/Cmd + D to download PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      downloadBtn.click();
    }
  });
}

/* ====== Setup alert for unsaved changes ====== */
function setupUnsavedChangesAlert() {
  window.addEventListener('beforeunload', function(e) {
    if (isDirty) {
      // Standard text shown regardless of returned string
      const message = 'You have unsaved changes. Are you sure you want to leave?';
      e.returnValue = message;
      return message;
    }
  });
}

/* ====== Setup default PDF filename ====== */
function setupDefaultPdfFilename() {
  try {
    const filenameInput = document.getElementById('pdf-filename');
    if (!filenameInput) {
      console.warn('PDF filename input not found');
      return;
    }
    
    // Set default filename based on customer and project name
    function updateDefaultFilename() {
      try {
        const customerNameEl = document.getElementById('customer-name');
        const projectNameEl = document.getElementById('project-name');
        
        if (!customerNameEl || !projectNameEl) {
          console.warn('Customer or project name elements not found');
          return;
        }
        
        const customerName = customerNameEl.textContent || 'Client';
        const projectName = projectNameEl.textContent || 'Project';
        
        // Only update if the field is empty or has the previous default value
        if (!filenameInput.value || filenameInput._isDefault) {
          filenameInput.value = `${customerName} - ${projectName}`.replace(/[\\/:*?"<>|]/g, '-');
          filenameInput._isDefault = true;
        }
      } catch (err) {
        console.error('Error updating default filename:', err);
      }
    }
    
    // Update filename when customer or project name changes
    const customerNameEl = document.getElementById('customer-name');
    const projectNameEl = document.getElementById('project-name');
    
    if (customerNameEl) {
      customerNameEl.addEventListener('blur', updateDefaultFilename);
    }
    
    if (projectNameEl) {
      projectNameEl.addEventListener('blur', updateDefaultFilename);
    }
    
    // Mark as custom when user changes the filename
    filenameInput.addEventListener('input', function() {
      this._isDefault = false;
    });
    
    // Set initial default
    updateDefaultFilename();
  } catch (error) {
    console.error('Error setting up PDF filename:', error);
  }
}

/* ====== Handle form submit ====== */
submitBtn.addEventListener("click", e => {
  e.preventDefault();
  
  try {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Adding...";
    
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
    
    // Try to save items - handle potential errors
    try {
      if (typeof localStorage === 'undefined') {
        throw new Error('localStorage is not available');
      }
      
      // Save items to localStorage
      localStorage.setItem("estimateItems", JSON.stringify(items));
      
      // Mark as having unsaved changes
      isDirty = true;
    } catch (storageError) {
      console.error("Error saving to localStorage:", storageError);
      
      // Create a modal dialog for the storage error
      showErrorModal("Error Saving Items", 
        "Your selections have been added to the current session, but could not be saved to browser storage. " +
        "Your selections may be lost if you close the browser or reload the page.",
        storageError.message || "Storage error");
      
      // Still continue since the items are in memory
    }
  } catch (error) {
    console.error("Error adding items:", error);
    showErrorModal("Error Adding Items", 
      "There was an error adding the selected items.", 
      error.message || "Unknown error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Add Selection";
  }
});

// Helper function to show error modals
function showErrorModal(title, message, details) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '9999';
  
  const content = document.createElement('div');
  content.style.backgroundColor = 'white';
  content.style.padding = '20px';
  content.style.borderRadius = '5px';
  content.style.maxWidth = '90%';
  content.style.textAlign = 'center';
  
  content.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <p>Error details: ${details}</p>
    <button id="ok-error-btn" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">OK</button>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  document.getElementById('ok-error-btn').addEventListener('click', function() {
    document.body.removeChild(modal);
  });
}

/* ====== Add a row ====== */
function addRowToTable(item) {
  try {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" loading="lazy"></td>
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
          try {
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
                
                // Try to save to localStorage with error handling
                try {
                  localStorage.setItem("estimateItems", JSON.stringify(items));
                  
                  // Mark as having unsaved changes
                  isDirty = true;
                } catch (storageError) {
                  console.error("Error saving edited item to localStorage:", storageError);
                  
                  // Show error but don't disrupt the edit
                  showErrorModal("Error Saving Changes", 
                    "Your edit was applied but could not be saved permanently. The changes may be lost if you close the browser.",
                    storageError.message || "Storage error");
                }
              }
            }
          } catch (error) {
            console.error("Error saving edited description:", error);
            showErrorModal("Error Saving Description", 
              "There was an error saving your changes.",
              error.message || "Unknown error");
          }
        }
      }
    });
    
    // Add delete functionality
    row.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Are you sure you want to remove this item?")) {
        try {
          const index = Array.from(tableBody.children).indexOf(row);
          if (index !== -1) {
            items.splice(index, 1);
            
            // Try to save to localStorage with error handling
            try {
              localStorage.setItem("estimateItems", JSON.stringify(items));
              
              // Mark as having unsaved changes
              isDirty = true;
            } catch (storageError) {
              console.error("Error saving after delete to localStorage:", storageError);
              
              // Show error but continue with UI update
              showErrorModal("Error Saving Changes", 
                "The item was removed from the current view but this change couldn't be saved permanently.", 
                storageError.message || "Storage error");
            }
          }
          row.remove();
        } catch (error) {
          console.error("Error removing item:", error);
          showErrorModal("Error Removing Item", 
            "There was an error removing the item.",
            error.message || "Unknown error");
        }
      }
    });
    
    tableBody.appendChild(row);
  } catch (error) {
    console.error("Error adding row to table:", error);
    showErrorModal("Error Adding Item", 
      "There was an error displaying an item. Please refresh and try again.",
      error.message || "Unknown error");
  }
}

/* ====== Print, Clear, Download ====== */
generateBtn.addEventListener("click", () => {
  try {
    // Clear the isDirty flag as we're saving/printing
    isDirty = false;
    window.print();
  } catch (error) {
    console.error("Error generating print view:", error);
    alert("There was an error generating the print view. Please try again.");
  }
});

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all selections? This cannot be undone.")) {
    try {
      items = [];
      tableBody.innerHTML = "";
      localStorage.removeItem("estimateItems");
      
      // Mark as having unsaved changes
      isDirty = false;  // No items to save anymore
    } catch (error) {
      console.error("Error clearing items:", error);
      alert("There was an error clearing the items. Please try again.");
    }
  }
});

// PDF Download function
downloadBtn.addEventListener("click", async () => {
  // Show loading state
  if (downloadBtn) {
    downloadBtn.disabled = true;
    // downloadBtn.textContent = "Generating PDF...";
    const originalText = downloadBtn.textContent;
  }
  
  const hide = (sel) => {
    const elements = document.querySelectorAll(sel);
    if (elements && elements.length) {
      elements.forEach(el => { if (el) el.style.display = 'none'; });
    }
  };
  
  const show = (sel) => {
    const elements = document.querySelectorAll(sel);
    if (elements && elements.length) {
      elements.forEach(el => { if (el) el.style.display = ''; });
    }
  };

  // Hide elements not needed in PDF
  hide(".delete-btn");
  hide("#estimate-table th:nth-child(3)");
  hide("#estimate-table td:nth-child(3)");
  hide(".actions");
  hide("#product-form");
  hide(".user-controls");
  
  try {
    // Get custom filename if provided, otherwise generate one
    const filenameInput = document.getElementById('pdf-filename');
    let filename = 'estimate.pdf'; // Default fallback
    
    if (filenameInput && filenameInput.value && filenameInput.value.trim() !== '') {
      // Use custom filename, ensure it has .pdf extension
      filename = filenameInput.value.trim();
      if (!filename.toLowerCase().endsWith('.pdf')) {
        filename += '.pdf';
      }
    } else {
      // Fallback to generated filename format
      const customerNameEl = document.getElementById('customer-name');
      const estimateNumEl = document.getElementById('estimate-number');
      
      const customerName = customerNameEl && customerNameEl.textContent ? 
        customerNameEl.textContent.replace(/\s+/g, '_') : 'Client';
      
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const estimateNum = estimateNumEl && estimateNumEl.textContent ? 
        estimateNumEl.textContent : 'EST';
      
      filename = `Estimate_${estimateNum}_${customerName}_${date}.pdf`;
    }
    
    // Replace invalid characters for filenames
    filename = filename.replace(/[\\/:*?"<>|]/g, '-');
    
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      throw new Error('PDF library not loaded');
    }
    
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Safely get elements
    const rows = document.querySelectorAll("#estimate-table tbody tr");
    
    // Get header elements with null checks
    const header = document.querySelector(".invoice-header");
    const orderDetails = document.querySelector(".order-details");
    const customerSection = document.querySelector(".customer-section");
    const poProjectSection = document.querySelector(".po-project-section");
    
    if (!header || !orderDetails || !customerSection || !poProjectSection) {
      throw new Error('Required page sections not found');
    }
    
    // Add progress feedback
    const totalOperations = 5 + (rows ? rows.length : 0);
    let currentOperation = 0;
    
    function updateProgress(operation) {
      currentOperation++;
      const progressText = `${operation} (${Math.round((currentOperation/totalOperations) * 100)}%)`;
      
      if (downloadBtn) {
        downloadBtn.textContent = progressText;
      }
      
      console.log(progressText);
    }
    
    // Capture header elements
    const headerCanvas = await html2canvas(header, { 
      scale: 2, 
      useCORS: true,
      logging: false,
      allowTaint: true
    });
    const headerImgData = headerCanvas.toDataURL("image/png");
    const headerImgProps = pdf.getImageProperties(headerImgData);
    const headerImgWidth = pageWidth;
    const headerImgHeight = (headerImgProps.height * headerImgWidth) / headerImgProps.width;
    
    // Add header to first page
    pdf.addImage(headerImgData, 'PNG', 0, 0, headerImgWidth, headerImgHeight);
    let currentY = headerImgHeight + 5;
    
    // Add order details
    const orderCanvas = await html2canvas(orderDetails, { 
      scale: 2, 
      useCORS: true,
      logging: false,
      allowTaint: true 
    });
    const orderImgData = orderCanvas.toDataURL("image/png");
    const orderImgProps = pdf.getImageProperties(orderImgData);
    const orderImgWidth = pageWidth;
    const orderImgHeight = (orderImgProps.height * orderImgWidth) / orderImgProps.width;
    
    pdf.addImage(orderImgData, 'PNG', 0, currentY, orderImgWidth, orderImgHeight);
    currentY += orderImgHeight + 5;
    
    // Add customer section
    const customerCanvas = await html2canvas(customerSection, { 
      scale: 2, 
      useCORS: true,
      logging: false,
      allowTaint: true
    });
    const customerImgData = customerCanvas.toDataURL("image/png");
    const customerImgProps = pdf.getImageProperties(customerImgData);
    const customerImgWidth = pageWidth;
    const customerImgHeight = (customerImgProps.height * customerImgWidth) / customerImgProps.width;
    
    pdf.addImage(customerImgData, 'PNG', 0, currentY, customerImgWidth, customerImgHeight);
    currentY += customerImgHeight + 5;
    
    // Add PO project section
    const poCanvas = await html2canvas(poProjectSection, { 
      scale: 2, 
      useCORS: true,
      logging: false,
      allowTaint: true
    });
    const poImgData = poCanvas.toDataURL("image/png");
    const poImgProps = pdf.getImageProperties(poImgData);
    const poImgWidth = pageWidth;
    const poImgHeight = (poImgProps.height * poImgWidth) / poImgProps.width;
    
    pdf.addImage(poImgData, 'PNG', 0, currentY, poImgWidth, poImgHeight);
    currentY += poImgHeight + 10;
    
    // Add table header
    const tableHeader = document.querySelector("#estimate-table thead");
    const thCanvas = await html2canvas(tableHeader, { 
      scale: 2, 
      useCORS: true,
      logging: false,
      allowTaint: true
    });
    const thImgData = thCanvas.toDataURL("image/png");
    const thImgProps = pdf.getImageProperties(thImgData);
    const thImgWidth = pageWidth;
    const thImgHeight = (thImgProps.height * thImgWidth) / thImgProps.width;
    
    pdf.addImage(thImgData, 'PNG', 0, currentY, thImgWidth, thImgHeight);
    currentY += thImgHeight + 2;
    
    // Process each row individually
    for (let i = 0; i < rows.length; i++) {
      
      // Check if we need a new page
      if (currentY > pageHeight - 30) {
        pdf.addPage();
        // Reset Y position and add the table header again
        currentY = 10;
        pdf.addImage(thImgData, 'PNG', 0, currentY, thImgWidth, thImgHeight);
        currentY += thImgHeight + 2;
      }
      
      // Capture the row
      const rowCanvas = await html2canvas(rows[i], { 
        scale: 2, 
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      const rowImgData = rowCanvas.toDataURL("image/png");
      const rowImgProps = pdf.getImageProperties(rowImgData);
      const rowImgWidth = pageWidth;
      const rowImgHeight = (rowImgProps.height * rowImgWidth) / rowImgProps.width;
      
      // If this row would exceed page height, add a new page
      if (currentY + rowImgHeight > pageHeight - 10) {
        pdf.addPage();
        currentY = 10;
        pdf.addImage(thImgData, 'PNG', 0, currentY, thImgWidth, thImgHeight);
        currentY += thImgHeight + 2;
      }
      
      // Add the row to PDF
      pdf.addImage(rowImgData, 'PNG', 0, currentY, rowImgWidth, rowImgHeight);
      currentY += rowImgHeight;
    }
    
    // Save the PDF
    pdf.save(filename);
    
    // Clear the isDirty flag since we've effectively saved
    isDirty = false;
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    showErrorModal("Error Generating PDF", 
      "There was an error generating the PDF. Please try again.", 
      error.message || "Unknown error");
  } finally {
    // Restore hidden elements
    show(".delete-btn");
    show("#estimate-table th:nth-child(3)");
    show("#estimate-table td:nth-child(3)");
    show(".actions");
    show("#product-form");
    show(".user-controls");
    
    // Reset button state
    if (downloadBtn) {
      downloadBtn.disabled = false;
      if (typeof originalText !== 'undefined') {
        downloadBtn.textContent = originalText;
      }
    }
  }
});

/* ====== Set user's initials in Rep field ====== */
function setUserInitialsInRepField() {
  try {
    const userInitials = localStorage.getItem('userInitials');
    if (userInitials) {
      // Find the Rep field element - check multiple possible selectors
      let repField = document.getElementById('rep');
      
      // If not found by id, try to find by other common attributes
      if (!repField) {
        repField = document.querySelector('[name="rep"]');
      }
      
      if (!repField) {
        // Look for any input, select, or div that might be the Rep field
        const possibleRepFields = document.querySelectorAll('input, select, div, span');
        for (const field of possibleRepFields) {
          // Check if the field label or placeholder contains "rep"
          if ((field.placeholder && field.placeholder.toLowerCase().includes('rep')) ||
              (field.previousElementSibling && field.previousElementSibling.textContent && 
               field.previousElementSibling.textContent.toLowerCase().includes('rep'))) {
            repField = field;
            break;
          }
        }
      }
      
      // One more attempt - look for any element that contains "Rep" text
      if (!repField) {
        const repContainer = Array.from(document.querySelectorAll('.box-header'))
          .find(el => el && el.textContent && el.textContent.toLowerCase().includes('rep'));
        
        if (repContainer && repContainer.nextElementSibling) {
          repField = repContainer.nextElementSibling.querySelector('.box-content') || 
                    repContainer.nextElementSibling;
        }
      }
      
      // If we found the Rep field, set its value or text content
      if (repField) {
        if (repField.tagName === 'INPUT' || repField.tagName === 'SELECT') {
          repField.value = userInitials;
        } else if (repField.hasAttribute('contenteditable')) {
          repField.textContent = userInitials;
        } else {
          repField.textContent = userInitials;
        }
        console.log('Set user initials:', userInitials);
      } else {
        console.warn('Rep field not found');
      }
    }
  } catch (error) {
    console.error('Error setting user initials:', error);
  }
}
