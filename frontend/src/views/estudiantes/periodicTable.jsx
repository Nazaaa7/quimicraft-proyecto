import React, { useState } from 'react';
import { X } from 'lucide-react';
const periodicData = {
  "H": { name: "Hydrogen", number: 1, mass: "1.008", category: "nonmetal", group: 1, period: 1 },
  "He": { name: "Helium", number: 2, mass: "4.0026", category: "noble-gas", group: 18, period: 1 },
  "Li": { name: "Lithium", number: 3, mass: "6.94", category: "alkali-metal", group: 1, period: 2 },
  "Be": { name: "Beryllium", number: 4, mass: "9.0122", category: "alkaline-earth", group: 2, period: 2 },
  "B": { name: "Boron", number: 5, mass: "10.81", category: "metalloid", group: 13, period: 2 },
  "C": { name: "Carbon", number: 6, mass: "12.011", category: "nonmetal", group: 14, period: 2 },
  "N": { name: "Nitrogen", number: 7, mass: "14.007", category: "nonmetal", group: 15, period: 2 },
  "O": { name: "Oxygen", number: 8, mass: "15.999", category: "nonmetal", group: 16, period: 2 },
  "F": { name: "Fluorine", number: 9, mass: "18.998", category: "nonmetal", group: 17, period: 2 },
  "Ne": { name: "Neon", number: 10, mass: "20.180", category: "noble-gas", group: 18, period: 2 },
  "Na": { name: "Sodium", number: 11, mass: "22.990", category: "alkali-metal", group: 1, period: 3 },
  "Mg": { name: "Magnesium", number: 12, mass: "24.305", category: "alkaline-earth", group: 2, period: 3 },
  "Al": { name: "Aluminum", number: 13, mass: "26.982", category: "post-transition", group: 13, period: 3 },
  "Si": { name: "Silicon", number: 14, mass: "28.085", category: "metalloid", group: 14, period: 3 },
  "P": { name: "Phosphorus", number: 15, mass: "30.974", category: "nonmetal", group: 15, period: 3 },
  "S": { name: "Sulfur", number: 16, mass: "32.06", category: "nonmetal", group: 16, period: 3 },
  "Cl": { name: "Chlorine", number: 17, mass: "35.45", category: "nonmetal", group: 17, period: 3 },
  "Ar": { name: "Argon", number: 18, mass: "39.948", category: "noble-gas", group: 18, period: 3 },
  "K": { name: "Potassium", number: 19, mass: "39.098", category: "alkali-metal", group: 1, period: 4 },
  "Ca": { name: "Calcium", number: 20, mass: "40.078", category: "alkaline-earth", group: 2, period: 4 },
  "Sc": { name: "Scandium", number: 21, mass: "44.956", category: "transition", group: 3, period: 4 },
  "Ti": { name: "Titanium", number: 22, mass: "47.867", category: "transition", group: 4, period: 4 },
  "V": { name: "Vanadium", number: 23, mass: "50.942", category: "transition", group: 5, period: 4 },
  "Cr": { name: "Chromium", number: 24, mass: "51.996", category: "transition", group: 6, period: 4 },
  "Mn": { name: "Manganese", number: 25, mass: "54.938", category: "transition", group: 7, period: 4 },
  "Fe": { name: "Iron", number: 26, mass: "55.845", category: "transition", group: 8, period: 4 },
  "Co": { name: "Cobalt", number: 27, mass: "58.933", category: "transition", group: 9, period: 4 },
  "Ni": { name: "Nickel", number: 28, mass: "58.693", category: "transition", group: 10, period: 4 },
  "Cu": { name: "Copper", number: 29, mass: "63.546", category: "transition", group: 11, period: 4 },
  "Zn": { name: "Zinc", number: 30, mass: "65.38", category: "transition", group: 12, period: 4 },
  "Ga": { name: "Gallium", number: 31, mass: "69.723", category: "post-transition", group: 13, period: 4 },
  "Ge": { name: "Germanium", number: 32, mass: "72.63", category: "metalloid", group: 14, period: 4 },
  "As": { name: "Arsenic", number: 33, mass: "74.922", category: "metalloid", group: 15, period: 4 },
  "Se": { name: "Selenium", number: 34, mass: "78.971", category: "nonmetal", group: 16, period: 4 },
  "Br": { name: "Bromine", number: 35, mass: "79.904", category: "nonmetal", group: 17, period: 4 },
  "Kr": { name: "Krypton", number: 36, mass: "83.798", category: "noble-gas", group: 18, period: 4 },
  "Rb": { name: "Rubidium", number: 37, mass: "85.468", category: "alkali-metal", group: 1, period: 5 },
  "Sr": { name: "Strontium", number: 38, mass: "87.62", category: "alkaline-earth", group: 2, period: 5 },
  "Y": { name: "Yttrium", number: 39, mass: "88.906", category: "transition", group: 3, period: 5 },
  "Zr": { name: "Zirconium", number: 40, mass: "91.224", category: "transition", group: 4, period: 5 },
  "Nb": { name: "Niobium", number: 41, mass: "92.906", category: "transition", group: 5, period: 5 },
  "Mo": { name: "Molybdenum", number: 42, mass: "95.95", category: "transition", group: 6, period: 5 },
  "Tc": { name: "Technetium", number: 43, mass: "98", category: "transition", group: 7, period: 5 },
  "Ru": { name: "Ruthenium", number: 44, mass: "101.07", category: "transition", group: 8, period: 5 },
  "Rh": { name: "Rhodium", number: 45, mass: "102.91", category: "transition", group: 9, period: 5 },
  "Pd": { name: "Palladium", number: 46, mass: "106.42", category: "transition", group: 10, period: 5 },
  "Ag": { name: "Silver", number: 47, mass: "107.87", category: "transition", group: 11, period: 5 },
  "Cd": { name: "Cadmium", number: 48, mass: "112.41", category: "transition", group: 12, period: 5 },
  "In": { name: "Indium", number: 49, mass: "114.82", category: "post-transition", group: 13, period: 5 },
  "Sn": { name: "Tin", number: 50, mass: "118.71", category: "post-transition", group: 14, period: 5 },
  "Sb": { name: "Antimony", number: 51, mass: "121.76", category: "metalloid", group: 15, period: 5 },
  "Te": { name: "Tellurium", number: 52, mass: "127.60", category: "metalloid", group: 16, period: 5 },
  "I": { name: "Iodine", number: 53, mass: "126.90", category: "nonmetal", group: 17, period: 5 },
  "Xe": { name: "Xenon", number: 54, mass: "131.29", category: "noble-gas", group: 18, period: 5 },
  "Cs": { name: "Cesium", number: 55, mass: "132.91", category: "alkali-metal", group: 1, period: 6 },
  "Ba": { name: "Barium", number: 56, mass: "137.33", category: "alkaline-earth", group: 2, period: 6 },
  "La": { name: "Lanthanum", number: 57, mass: "138.91", category: "lanthanoid", group: 3, period: 6 },
  "Ce": { name: "Cerium", number: 58, mass: "140.12", category: "lanthanoid", group: 3, period: 6 },
  "Pr": { name: "Praseodymium", number: 59, mass: "140.91", category: "lanthanoid", group: 3, period: 6 },
  "Nd": { name: "Neodymium", number: 60, mass: "144.24", category: "lanthanoid", group: 3, period: 6 },
  "Pm": { name: "Promethium", number: 61, mass: "145", category: "lanthanoid", group: 3, period: 6 },
  "Sm": { name: "Samarium", number: 62, mass: "150.36", category: "lanthanoid", group: 3, period: 6 },
  "Eu": { name: "Europium", number: 63, mass: "151.96", category: "lanthanoid", group: 3, period: 6 },
  "Gd": { name: "Gadolinium", number: 64, mass: "157.25", category: "lanthanoid", group: 3, period: 6 },
  "Tb": { name: "Terbium", number: 65, mass: "158.93", category: "lanthanoid", group: 3, period: 6 },
  "Dy": { name: "Dysprosium", number: 66, mass: "162.50", category: "lanthanoid", group: 3, period: 6 },
  "Ho": { name: "Holmium", number: 67, mass: "164.93", category: "lanthanoid", group: 3, period: 6 },
  "Er": { name: "Erbium", number: 68, mass: "167.26", category: "lanthanoid", group: 3, period: 6 },
  "Tm": { name: "Thulium", number: 69, mass: "168.93", category: "lanthanoid", group: 3, period: 6 },
  "Yb": { name: "Ytterbium", number: 70, mass: "173.05", category: "lanthanoid", group: 3, period: 6 },
  "Lu": { name: "Lutetium", number: 71, mass: "174.97", category: "lanthanoid", group: 3, period: 6 },
  "Hf": { name: "Hafnium", number: 72, mass: "178.49", category: "transition", group: 4, period: 6 },
  "Ta": { name: "Tantalum", number: 73, mass: "180.95", category: "transition", group: 5, period: 6 },
  "W": { name: "Tungsten", number: 74, mass: "183.84", category: "transition", group: 6, period: 6 },
  "Re": { name: "Rhenium", number: 75, mass: "186.21", category: "transition", group: 7, period: 6 },
  "Os": { name: "Osmium", number: 76, mass: "190.23", category: "transition", group: 8, period: 6 },
  "Ir": { name: "Iridium", number: 77, mass: "192.22", category: "transition", group: 9, period: 6 },
  "Pt": { name: "Platinum", number: 78, mass: "195.08", category: "transition", group: 10, period: 6 },
  "Au": { name: "Gold", number: 79, mass: "196.97", category: "transition", group: 11, period: 6 },
  "Hg": { name: "Mercury", number: 80, mass: "200.59", category: "transition", group: 12, period: 6 },
  "Tl": { name: "Thallium", number: 81, mass: "204.38", category: "post-transition", group: 13, period: 6 },
  "Pb": { name: "Lead", number: 82, mass: "207.2", category: "post-transition", group: 14, period: 6 },
  "Bi": { name: "Bismuth", number: 83, mass: "208.98", category: "post-transition", group: 15, period: 6 },
  "Po": { name: "Polonium", number: 84, mass: "(209)", category: "metalloid", group: 16, period: 6 },
  "At": { name: "Astatine", number: 85, mass: "(210)", category: "metalloid", group: 17, period: 6 },
  "Rn": { name: "Radon", number: 86, mass: "(222)", category: "noble-gas", group: 18, period: 6 },
  "Fr": { name: "Francium", number: 87, mass: "(223)", category: "alkali-metal", group: 1, period: 7 },
  "Ra": { name: "Radium", number: 88, mass: "(226)", category: "alkaline-earth", group: 2, period: 7 },
  "Ac": { name: "Actinium", number: 89, mass: "(227)", category: "actinoid", group: 3, period: 7 },
  "Th": { name: "Thorium", number: 90, mass: "232.04", category: "actinoid", group: 3, period: 7 },
  "Pa": { name: "Protactinium", number: 91, mass: "231.04", category: "actinoid", group: 3, period: 7 },
  "U": { name: "Uranium", number: 92, mass: "238.03", category: "actinoid", group: 3, period: 7 },
  "Np": { name: "Neptunium", number: 93, mass: "(237)", category: "actinoid", group: 3, period: 7 },
  "Pu": { name: "Plutonium", number: 94, mass: "(244)", category: "actinoid", group: 3, period: 7 },
  "Am": { name: "Americium", number: 95, mass: "(243)", category: "actinoid", group: 3, period: 7 },
  "Cm": { name: "Curium", number: 96, mass: "(247)", category: "actinoid", group: 3, period: 7 },
  "Bk": { name: "Berkelium", number: 97, mass: "(247)", category: "actinoid", group: 3, period: 7 },
  "Cf": { name: "Californium", number: 98, mass: "(251)", category: "actinoid", group: 3, period: 7 },
  "Es": { name: "Einsteinium", number: 99, mass: "(252)", category: "actinoid", group: 3, period: 7 },
  "Fm": { name: "Fermium", number: 100, mass: "(257)", category: "actinoid", group: 3, period: 7 },
  "Md": { name: "Mendelevium", number: 101, mass: "(258)", category: "actinoid", group: 3, period: 7 },
  "No": { name: "Nobelium", number: 102, mass: "(259)", category: "actinoid", group: 3, period: 7 },
  "Lr": { name: "Lawrencium", number: 103, mass: "(262)", category: "actinoid", group: 3, period: 7 },
  "Rf": { name: "Rutherfordium", number: 104, mass: "(267)", category: "transition", group: 4, period: 7 },
  "Db": { name: "Dubnium", number: 105, mass: "(270)", category: "transition", group: 5, period: 7 },
  "Sg": { name: "Seaborgium", number: 106, mass: "(271)", category: "transition", group: 6, period: 7 },
  "Bh": { name: "Bohrium", number: 107, mass: "(270)", category: "transition", group: 7, period: 7 },
  "Hs": { name: "Hassium", number: 108, mass: "(277)", category: "transition", group: 8, period: 7 },
  "Mt": { name: "Meitnerium", number: 109, mass: "(278)", category: "transition", group: 9, period: 7 },
  "Ds": { name: "Darmstadtium", number: 110, mass: "(281)", category: "transition", group: 10, period: 7 },
  "Rg": { name: "Roentgenium", number: 111, mass: "(282)", category: "transition", group: 11, period: 7 },
  "Cn": { name: "Copernicium", number: 112, mass: "(285)", category: "transition", group: 12, period: 7 },
  "Nh": { name: "Nihonium", number: 113, mass: "(286)", category: "post-transition", group: 13, period: 7 },
  "Fl": { name: "Flerovium", number: 114, mass: "(289)", category: "post-transition", group: 14, period: 7 },
  "Mc": { name: "Moscovium", number: 115, mass: "(290)", category: "post-transition", group: 15, period: 7 },
  "Lv": { name: "Livermorium", number: 116, mass: "(293)", category: "post-transition", group: 16, period: 7 },
  "Ts": { name: "Tennessine", number: 117, mass: "(294)", category: "metalloid", group: 17, period: 7 },
  "Og": { name: "Oganesson", number: 118, mass: "(294)", category: "noble-gas", group: 18, period: 7 }
};


const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const handleElementClick = (symbol) => {
    setSelectedElement(periodicData[symbol]);
  };

  const closeInfoBox = () => {
    setSelectedElement(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, 50px)', gap: '10px', padding: '20px' }}>
      {Object.keys(periodicData).map((symbol) => (
        <button
          key={symbol}
          onClick={() => handleElementClick(symbol)}
          style={{ padding: '10px', backgroundColor: '#ddd', border: '1px solid #ccc', borderRadius: '5px' }}
        >
          {symbol}
        </button>
      ))}
      {selectedElement && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        }}>
          <button onClick={closeInfoBox} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none' }}>
            <X size={20} />
          </button>
          <h3>{selectedElement.name}</h3>
          <p><strong>Atomic Number:</strong> {selectedElement.number}</p>
          <p><strong>Atomic Mass:</strong> {selectedElement.mass}</p>
          <p><strong>Category:</strong> {selectedElement.category}</p>
          <p><strong>Group:</strong> {selectedElement.group}</p>
          <p><strong>Period:</strong> {selectedElement.period}</p>
        </div>
      )}
      {selectedElement && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }} onClick={closeInfoBox}></div>
      )}
    </div>
  );
};

export default PeriodicTable;
