function stripQIfPresent(str: string) {
  if (/^q\d+:/.test(str)) {
    return str.replace(/^q\d+:\s*/, '');
  }
  return str;
}

export function categorizeAlcoholGP(alco_f: string, alco_q: string): number {
  if (!alco_f) {
    
  }

  const alco_freq = parseInt(stripQIfPresent(alco_f));
  const alco_quant = parseInt(stripQIfPresent(alco_q));
  

  // 1) “Never” drinkers → 0
  if (alco_freq === 0) {
    return 0;
  }

  // 2) Turn the remaining strings into a numeric frequency
  const freq = alco_freq;

  if (Number.isNaN(freq)) {
    console.log(alco_f, freq);
    
    throw new Error(`Invalid alcohol frequency: ${alco_f}`);
  }

  // 3) Light drinking → category 1
  const light =
    (freq === 1 && alco_quant < 14) ||
    (freq > 1 && freq < 4 && alco_quant < 5) ||
    (freq > 3 && alco_quant < 4);

  if (light) {
    return 1;
  }

  // 4) Heavy drinking → category 2
  const heavy =
    (freq === 1 && alco_quant >= 14) ||
    (freq > 1 && freq < 4 && alco_quant >= 5) ||
    (freq > 3 && alco_quant >= 4);

  if (heavy) {
    return 2;
  }

  // 5) Fallback if nothing matched
  return 0;
}
