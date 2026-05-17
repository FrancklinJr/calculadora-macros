let gender = 'm';
 
function setGender(g, el) {
  gender = g;
  document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}
 
function calcular() {
  const age = parseFloat(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const activity = parseFloat(document.getElementById('activity').value);
  const goal = document.getElementById('goal').value;
 
  if (!age || !weight || !height) {
    alert('Preencha todos os campos antes de calcular.');
    return;
  }

  let bmr;
  if (gender === 'm') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
 
  const tdee = bmr * activity;
 
  let adjust = 0, meta, tip;
  if (goal === 'cut') {
    adjust = -400;
    meta = tdee + adjust;
    tip = '<strong>Emagrecimento:</strong> déficit de 400 kcal aplicado. Priorize proteína alta para preservar massa muscular enquanto perde gordura. Evite déficits maiores que 500 kcal por dia.';
  } else if (goal === 'bulk') {
    adjust = +300;
    meta = tdee + adjust;
    tip = '<strong>Ganho de massa:</strong> superávit de 300 kcal aplicado. Treino de força é indispensável para que o excedente vire músculo, não gordura. Proteína alta é essencial.';
  } else {
    meta = tdee;
    tip = '<strong>Manutenção:</strong> coma próximo das calorias calculadas para manter seu peso atual. Ajuste conforme seu peso na balança ao longo de 2–3 semanas.';
  }

  let protG, fatG, carbG;
  if (goal === 'cut') {
    protG = Math.round(weight * 2.2);
    fatG = Math.round(meta * 0.25 / 9);
    carbG = Math.round((meta - protG * 4 - fatG * 9) / 4);
  } else if (goal === 'bulk') {
    protG = Math.round(weight * 2.0);
    fatG = Math.round(meta * 0.25 / 9);
    carbG = Math.round((meta - protG * 4 - fatG * 9) / 4);
  } else {
    protG = Math.round(weight * 1.8);
    fatG = Math.round(meta * 0.28 / 9);
    carbG = Math.round((meta - protG * 4 - fatG * 9) / 4);
  }
 
  const protKcal = protG * 4;
  const carbKcal = carbG * 4;
  const fatKcal = fatG * 9;
  const total = protKcal + carbKcal + fatKcal;
 
  const pProt = Math.round(protKcal / total * 100);
  const pCarb = Math.round(carbKcal / total * 100);
  const pFat = 100 - pProt - pCarb;
 
  // Render
  document.getElementById('r-kcal').textContent = Math.round(meta);
  document.getElementById('r-prot').textContent = protG;
  document.getElementById('r-carb').textContent = carbG;
  document.getElementById('r-fat').textContent = fatG;
  document.getElementById('r-bmr').textContent = Math.round(bmr) + ' kcal';
  document.getElementById('r-tdee').textContent = Math.round(tdee) + ' kcal';
  document.getElementById('r-adj').textContent = (adjust >= 0 ? '+' : '') + adjust + ' kcal';
  document.getElementById('r-meta').textContent = Math.round(meta) + ' kcal';
  document.getElementById('r-tip').innerHTML = tip;
 
  setTimeout(() => {
    document.getElementById('bar-prot').style.width = pProt + '%';
    document.getElementById('bar-carb').style.width = pCarb + '%';
    document.getElementById('bar-fat').style.width = pFat + '%';
  }, 100);
 
  document.getElementById('leg-prot').textContent = 'Proteína ' + pProt + '%';
  document.getElementById('leg-carb').textContent = 'Carboidrato ' + pCarb + '%';
  document.getElementById('leg-fat').textContent = 'Gordura ' + pFat + '%';
 
  const results = document.getElementById('results');
  results.style.display = 'block';
  setTimeout(() => results.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}