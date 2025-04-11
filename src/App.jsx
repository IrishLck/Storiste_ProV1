import React, { useState } from 'react'

const produits = {
  "Butler": 120,
  "Solopaque": 140,
  "Screen 3%": 130,
  "Screen 5%": 135
};

export default function App() {
  const [client, setClient] = useState({ nom: '', tel: '', adresse: '' });
  const [produit, setProduit] = useState("Butler");
  const [largeur, setLargeur] = useState('');
  const [hauteur, setHauteur] = useState('');
  const [motorisation, setMotorisation] = useState('');
  const [escomptes, setEscomptes] = useState({
    "Butler": 53,
    "Solopaque": 53,
    "Screen 3%": 53,
    "Screen 5%": 53
  });
  const [showEscompteModal, setShowEscompteModal] = useState(false);

  const prixListe = produits[produit] || 0;
  const escompte = escomptes[produit];
  const prixCoutant = prixListe * (1 - escompte / 100);
  const prixVente = prixCoutant + parseFloat(motorisation || 0);

  const handleEscompteChange = (prod, val) => {
    setEscomptes({ ...escomptes, [prod]: parseFloat(val) });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Soumission - Le Storiste</h1>

      <h2>Client</h2>
      <input placeholder="Nom*" value={client.nom} onChange={e => setClient({ ...client, nom: e.target.value })} /><br />
      <input placeholder="Téléphone*" value={client.tel} onChange={e => setClient({ ...client, tel: e.target.value })} /><br />
      <input placeholder="Adresse*" value={client.adresse} onChange={e => setClient({ ...client, adresse: e.target.value })} /><br />

      <h2>Produit</h2>
      <label>Produit :
        <select value={produit} onChange={e => setProduit(e.target.value)}>
          {Object.keys(produits).map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label><br />
      <label>Largeur :
        <input value={largeur} onChange={e => setLargeur(e.target.value)} />
      </label><br />
      <label>Hauteur :
        <input value={hauteur} onChange={e => setHauteur(e.target.value)} />
      </label><br />
      <label>Motorisation ($) :
        <input value={motorisation} onChange={e => setMotorisation(e.target.value)} />
      </label><br />

      <button onClick={() => setShowEscompteModal(true)}>⚙️ Ajuster les escomptes</button>

      {showEscompteModal && (
        <div style={{ background: '#eee', padding: 20, marginTop: 20 }}>
          <h3>Modifier les escomptes</h3>
          {Object.keys(produits).map(p => (
            <div key={p}>
              <label>{p} : </label>
              <input
                value={escomptes[p]}
                onChange={e => handleEscompteChange(p, e.target.value)}
              /> %
            </div>
          ))}
          <button onClick={() => setShowEscompteModal(false)}>Fermer</button>
        </div>
      )}

      <h2>Prix</h2>
      <p>Prix liste : <strong>{prixListe.toFixed(2)} $</strong></p>
      <p>Prix coûtant : <strong>{prixCoutant.toFixed(2)} $</strong></p>
      <p>Prix vente (avec options) : <strong>{prixVente.toFixed(2)} $</strong></p>
    </div>
  )
}
