// reserve.js：已用合计、会不会超卖与到期的那批（基线：一律给零与假与空表）
export function usedOf(holds) {
  return 0;
}

export function wouldExceed(holds, need, over) {
  return false;
}

export function sweptOf(holds, at) {
  return [];
}
